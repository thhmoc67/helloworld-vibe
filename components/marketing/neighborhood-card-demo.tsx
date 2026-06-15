"use client";

import { NeighborhoodTimeline } from "@/components/marketing/neighborhood-card";
import { cn } from "@/src/lib/cn";
import { useAnimateOnView } from "@/src/lib/use-animate-on-view";
import {
  neighborhoodRoutineSamples,
  neighborhoodSectionTitle,
} from "@/src/tokens/neighborhood-card";

export function NeighborhoodCardDemo() {
  const { ref, isActive, shouldAnimate } = useAnimateOnView();

  return (
    <div ref={ref} className="space-y-4">
      <h3
        className={cn(
          "text-xl font-bold tracking-tight text-gray-900 sm:text-2xl",
          shouldAnimate &&
            "transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none",
          shouldAnimate &&
            (isActive
              ? "translate-y-0 opacity-100"
              : "translate-y-3 opacity-0"),
        )}
      >
        {neighborhoodSectionTitle}
      </h3>
      <NeighborhoodTimeline
        items={neighborhoodRoutineSamples}
        isActive={isActive}
        shouldAnimate={shouldAnimate}
      />
    </div>
  );
}
