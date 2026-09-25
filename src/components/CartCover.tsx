import { cn } from "@/lib/utils";

/**
 * Art-directed cover for products. When a photo is available it is shown
 * with a quiet treatment; otherwise a tonal block with the piece's initial
 * keeps the grid elegant instead of broken.
 */
export function CartCover({
  hue,
  image,
  name,
  small = false,
  className,
}: {
  hue: number;
  image: string | null;
  name: string;
  small?: boolean;
  className?: string;
}) {
  if (image) {
    return (
      <div className={cn("relative overflow-hidden bg-secondary", className)}>
        <img
          src={image}
          alt={name}
          loading="lazy"
          className={cn(
            "h-full w-full object-cover",
            small ? "" : "transition-transform duration-700 hover:scale-[1.03]",
          )}
        />
      </div>
    );
  }
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-secondary",
        className,
      )}
      style={{
        background: `linear-gradient(145deg, oklch(0.93 0.02 ${hue}), oklch(0.86 0.035 ${hue}))`,
      }}
    >
      <span
        className={cn(
          "font-display text-muted-foreground/60",
          small ? "text-2xl" : "text-7xl",
        )}
      >
        {name.charAt(0)}
      </span>
    </div>
  );
}
