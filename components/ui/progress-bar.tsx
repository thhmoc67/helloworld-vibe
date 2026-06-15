"use client";

import { useEffect, useState } from "react";
import { cn } from "@/src/lib/cn";
import { useAnimateOnView } from "@/src/lib/use-animate-on-view";

export type ProgressBarSize = "sm" | "md";

export interface ProgressBarProps {
  value: number;
  animate?: boolean;
  size?: ProgressBarSize;
  className?: string;
  "aria-label"?: string;
}

const sizeClasses: Record<ProgressBarSize, string> = {
  sm: "h-1.5",
  md: "h-2",
};

const PROGRESS_ANIMATION_MS = 1000;

function clampValue(value: number) {
  return Math.min(100, Math.max(0, value));
}

export function ProgressBar({
  value,
  animate = true,
  size = "md",
  className,
  "aria-label": ariaLabel,
}: ProgressBarProps) {
  const target = clampValue(value);
  const { ref, isActive, shouldAnimate } = useAnimateOnView(animate);
  const [width, setWidth] = useState(shouldAnimate ? 0 : target);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    if (!shouldAnimate) {
      setWidth(target);
      return;
    }

    const frame = requestAnimationFrame(() => {
      setWidth(target);
    });

    return () => cancelAnimationFrame(frame);
  }, [isActive, shouldAnimate, target]);

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuenow={target}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel ?? `${target} percent`}
      className={cn(
        "w-full overflow-hidden rounded-full bg-gray-200",
        sizeClasses[size],
        shouldAnimate &&
          "transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none",
        shouldAnimate && (isActive ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"),
        className,
      )}
    >
      <div
        className={cn(
          "h-full rounded-full bg-gradient-progress-recommend",
          shouldAnimate &&
            "transition-[width] duration-1000 ease-out motion-reduce:transition-none",
        )}
        style={{
          width: `${width}%`,
          transitionDuration: shouldAnimate ? `${PROGRESS_ANIMATION_MS}ms` : undefined,
        }}
      />
    </div>
  );
}
