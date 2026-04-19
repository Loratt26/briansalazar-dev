import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroAssetPlaceholderProps {
  className?: string;
  iconSize?: "sm" | "md" | "lg";
}

/**
 * Subtle gradient block with a centered muted ImageIcon. Used as a temporary
 * stand-in wherever a real screenshot/video isn't yet available.
 */
export function HeroAssetPlaceholder({
  className,
  iconSize = "sm",
}: HeroAssetPlaceholderProps) {
  const iconClass =
    iconSize === "lg"
      ? "h-10 w-10"
      : iconSize === "md"
      ? "h-8 w-8"
      : "h-6 w-6";

  return (
    <div
      className={cn(
        "aspect-video w-full rounded-md border border-border bg-gradient-to-br from-white/[0.03] to-white/[0.01] flex items-center justify-center",
        className
      )}
      aria-hidden
    >
      <ImageIcon
        className={cn(iconClass, "text-muted-strong/60")}
        strokeWidth={1.5}
      />
    </div>
  );
}
