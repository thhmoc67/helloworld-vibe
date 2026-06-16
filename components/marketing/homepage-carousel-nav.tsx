import { LocalityCarouselButton } from "@/components/marketing/locality-card";
import { cn } from "@/src/lib/cn";

export function HomepageCarouselNav({
  onPrev,
  onNext,
  prevDisabled,
  nextDisabled,
  className,
}: {
  onPrev: () => void;
  onNext: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      <LocalityCarouselButton
        direction="prev"
        label="Previous"
        disabled={prevDisabled}
        onClick={onPrev}
      />
      <LocalityCarouselButton
        direction="next"
        label="Next"
        disabled={nextDisabled}
        onClick={onNext}
      />
    </div>
  );
}
