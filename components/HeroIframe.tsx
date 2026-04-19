"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const LOAD_TIMEOUT_MS = 10000;

interface HeroIframeProps {
  src: string;
  title: string;
}

export default function HeroIframe({ src, title }: HeroIframeProps) {
  const t = useTranslations("HeroIframe");
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setErrored((current) => (loaded ? current : true));
    }, LOAD_TIMEOUT_MS);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [loaded]);

  const handleLoad = () => {
    setLoaded(true);
    setErrored(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return (
    <div>
      <div className="relative w-full rounded-lg overflow-hidden border border-border bg-card min-h-[640px] md:min-h-[720px]">
        <iframe
          src={src}
          title={title}
          loading="lazy"
          onLoad={handleLoad}
          referrerPolicy="no-referrer-when-downgrade"
          sandbox="allow-scripts allow-same-origin allow-forms"
          className={cn(
            "absolute inset-0 w-full h-full transition-opacity duration-200",
            loaded ? "opacity-100" : "opacity-0"
          )}
        />

        {!loaded && !errored && (
          <div
            aria-hidden
            className="absolute inset-0 flex flex-col items-center justify-center gap-3"
          >
            <Loader2
              className="h-6 w-6 animate-spin text-muted"
              strokeWidth={1.75}
            />
            <p className="font-mono text-xs text-muted">{t("loading")}</p>
          </div>
        )}

        {errored && (
          <div
            role="alert"
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center"
          >
            <AlertCircle
              className="h-6 w-6 text-muted"
              strokeWidth={1.75}
              aria-hidden
            />
            <p className="text-sm text-muted">{t("error")}</p>
          </div>
        )}
      </div>

      <p className="mt-3 text-center font-mono text-xs text-muted">
        {t("hint")}
      </p>
    </div>
  );
}
