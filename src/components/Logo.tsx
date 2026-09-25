import { cn } from "@/lib/utils";

/**
 * AZ Boutique logo lockup — the IG profile-picture badge (black disc, gold
 * ring, AZ monogram) plus the "BOUTIQUE" tagline. Sizes in px for the badge.
 */
export function Logo({
  badgeSize = 40,
  className,
  wordmarkClassName,
  taglineClassName,
  showTagline = true,
}: {
  badgeSize?: number;
  className?: string;
  wordmarkClassName?: string;
  taglineClassName?: string;
  showTagline?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <img
        src="/logo.png"
        alt="AZ Boutique"
        width={badgeSize}
        height={badgeSize}
        className="shrink-0 rounded-full"
        style={{ width: badgeSize, height: badgeSize }}
      />
      {showTagline && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display tracking-[0.3em] uppercase",
              wordmarkClassName,
            )}
          >
            AZ Boutique
          </span>
          <span
            className={cn(
              "mt-1 text-[9px] tracking-[0.42em] uppercase text-muted-foreground",
              taglineClassName,
            )}
          >
            by Ayesha Zahid
          </span>
        </span>
      )}
    </span>
  );
}
