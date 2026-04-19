"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn, focusRing } from "@/lib/utils";

export interface GalleryImage {
  src: string;
  alt: string;
  label: string;
}

interface HeroGalleryProps {
  images: GalleryImage[];
}

const NATURAL_W = 1200;
const NATURAL_H = 4000;

export function HeroGallery({ images }: HeroGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const openLightbox = useCallback(() => setLightboxOpen(true), []);
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);
  const next = useCallback(
    () => setActiveIndex((i) => (i + 1) % images.length),
    [images.length]
  );
  const prev = useCallback(
    () => setActiveIndex((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );

  const active = images[activeIndex];
  if (!active) return null;

  // Tab arrow-key navigation between segmented control buttons.
  const onTabKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>, idx: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const dir = e.key === "ArrowRight" ? 1 : -1;
      const nextIdx = (idx + dir + images.length) % images.length;
      setActiveIndex(nextIdx);
      tabRefs.current[nextIdx]?.focus();
    }
  };

  return (
    <div>
      {/* Segmented control */}
      <div
        role="tablist"
        aria-label="Demo store screens"
        className="-mx-2 flex items-center gap-1 overflow-x-auto pb-2 pt-1 px-2"
      >
        {images.map((img, idx) => {
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

      {/* Scrollable image panel */}
      <div
        role="tabpanel"
        id={`gallery-panel-${activeIndex}`}
        aria-labelledby={`gallery-tab-${activeIndex}`}
        className="mt-2 overflow-y-auto rounded-lg border border-border bg-card max-h-[600px]"
      >
        <button
          type="button"
          onClick={openLightbox}
          aria-label={`Zoom into ${active.label}`}
          className={cn("block w-full cursor-zoom-in", focusRing)}
        >
          <Image
            src={active.src}
            alt={active.alt}
            width={NATURAL_W}
            height={NATURAL_H}
            sizes="(min-width: 768px) 720px, 100vw"
            className="block h-auto w-full"
            priority={activeIndex === 0}
          />
        </button>
      </div>

      <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-muted-strong">
        Click to zoom · Scroll to explore
      </p>

      {lightboxOpen && (
        <Lightbox
          images={images}
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
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function Lightbox({ images, index, onClose, onPrev, onNext }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const active = images[index];

  // Body scroll lock + keyboard handlers + initial focus + focus trap.
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
        // Focus trap: keep focus inside the dialog.
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
      aria-label={`${active.label} — full size`}
      onClick={(e) => {
        // Close when clicking the backdrop, not the image itself.
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-8"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close"
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
            aria-label="Previous image"
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
            aria-label="Next image"
            className={cn(
              "absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center rounded-full bg-black/40 p-2 text-foreground hover:text-accent transition-colors",
              focusRing
            )}
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </>
      )}

      {/* Click on the image area shouldn't close — wrap so backdrop click works only outside. */}
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
