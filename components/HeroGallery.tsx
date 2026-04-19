"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn, focusRing } from "@/lib/utils";

export interface GalleryImage {
  src: string;
  /** Matches caseStudyData.{slug}.gallery.{key} in messages. */
  key: string;
}

interface HeroGalleryProps {
  /** Slug of the parent case study — used to look up translations. */
  slug: string;
  images: GalleryImage[];
}

const NATURAL_W = 1200;
const NATURAL_H = 4000;

interface ResolvedImage {
  src: string;
  label: string;
  alt: string;
}

export function HeroGallery({ slug, images }: HeroGalleryProps) {
  const tg = useTranslations("HeroGallery");
  const tCs = useTranslations(`caseStudyData.${slug}.gallery`);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const resolved: ResolvedImage[] = useMemo(
    () =>
      images.map((img) => ({
        src: img.src,
        label: tCs(`${img.key}.label`),
        alt: tCs(`${img.key}.alt`),
      })),
    [images, tCs]
  );

  const openLightbox = useCallback(() => setLightboxOpen(true), []);
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);
  const next = useCallback(
    () => setActiveIndex((i) => (i + 1) % resolved.length),
    [resolved.length]
  );
  const prev = useCallback(
    () => setActiveIndex((i) => (i - 1 + resolved.length) % resolved.length),
    [resolved.length]
  );

  const active = resolved[activeIndex];
  if (!active) return null;

  const onTabKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>, idx: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const dir = e.key === "ArrowRight" ? 1 : -1;
      const nextIdx = (idx + dir + resolved.length) % resolved.length;
      setActiveIndex(nextIdx);
      tabRefs.current[nextIdx]?.focus();
    }
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label={tg("tablistAriaLabel")}
        className="-mx-2 flex items-center gap-1 overflow-x-auto pb-2 pt-1 px-2"
      >
        {resolved.map((img, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={img.src}
              ref={(el) => {
                tabRefs.current[idx] = el;
              }}
              role="tab"
              type="button"
              id={`gallery-tab-${idx}`}
              aria-selected={isActive}
              aria-controls={`gallery-panel-${idx}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveIndex(idx)}
              onKeyDown={(e) => onTabKeyDown(e, idx)}
              className={cn(
                "relative shrink-0 px-3 py-2 font-mono text-xs uppercase tracking-widest transition-colors",
                isActive
                  ? "text-accent"
                  : "text-muted hover:text-foreground",
                focusRing
              )}
            >
              {img.label}
              <span
                aria-hidden
                className={cn(
                  "absolute left-3 right-3 -bottom-px h-px transition-all duration-200",
                  isActive ? "bg-accent" : "bg-transparent"
                )}
              />
            </button>
          );
        })}
      </div>

      <div className="relative mt-2 min-h-[600px] overflow-hidden rounded-lg border border-border bg-card">
        {resolved.map((img, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div
              key={img.src}
              role="tabpanel"
              id={`gallery-panel-${idx}`}
              aria-labelledby={`gallery-tab-${idx}`}
              hidden={!isActive}
              className={cn(
                "absolute inset-0 max-h-[600px] overflow-y-auto transition-opacity duration-200 ease-out",
                isActive
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              )}
            >
              <button
                type="button"
                onClick={openLightbox}
                aria-label={tg("zoomLabel", { label: img.label })}
                tabIndex={isActive ? 0 : -1}
                className={cn("block w-full cursor-zoom-in", focusRing)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={NATURAL_W}
                  height={NATURAL_H}
                  sizes="(min-width: 768px) 720px, 100vw"
                  className="block h-auto w-full object-contain object-top"
                  priority={idx === 0}
                  loading={idx === 0 ? undefined : "eager"}
                />
              </button>
            </div>
          );
        })}
      </div>

      <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-muted-strong">
        {tg("hint")}
      </p>

      {lightboxOpen && (
        <Lightbox
          images={resolved}
          index={activeIndex}
          onClose={closeLightbox}
          onPrev={prev}
          onNext={next}
        />
      )}
    </div>
  );
}

interface LightboxProps {
  images: ResolvedImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function Lightbox({ images, index, onClose, onPrev, onNext }: LightboxProps) {
  const tg = useTranslations("HeroGallery");
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const active = images[index];

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        onNext();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        onPrev();
        return;
      }
      if (e.key === "Tab") {
        const root = dialogRef.current;
        if (!root) return;
        const focusables = root.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onNext, onPrev]);

  if (!active) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={tg("lightboxAriaLabel", { label: active.label })}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-8"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label={tg("close")}
        className={cn(
          "absolute top-4 right-4 z-10 rounded-md bg-black/40 p-2 text-foreground hover:text-accent transition-colors",
          focusRing
        )}
      >
        <X className="h-5 w-5" strokeWidth={1.75} />
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={onPrev}
            aria-label={tg("previousImage")}
            className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center rounded-full bg-black/40 p-2 text-foreground hover:text-accent transition-colors",
              focusRing
            )}
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label={tg("nextImage")}
            className={cn(
              "absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center rounded-full bg-black/40 p-2 text-foreground hover:text-accent transition-colors",
              focusRing
            )}
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </>
      )}

      <div
        className="relative flex max-h-[95vh] max-w-[95vw] items-start justify-center overflow-y-auto rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={active.src}
          alt={active.alt}
          width={NATURAL_W}
          height={NATURAL_H}
          sizes="95vw"
          className="block h-auto w-auto max-w-[95vw]"
        />
      </div>
    </div>
  );
}
