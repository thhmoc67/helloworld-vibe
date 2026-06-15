"use client";

import { useEffect, useState } from "react";
import { cn } from "@/src/lib/cn";

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
  const [width, setWidth] = useState(animate ? 0 : target);

  useEffect(() => {
    if (!animate) {
      setWidth(target);
      return;
    }

    const frame = requestAnimationFrame(() => {
      setWidth(target);
    });

    return () => cancelAnimationFrame(frame);
  }, [animate, target]);

  return (
    <div
      role="progressbar"
      aria-valuenow={target}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel ?? `${target} percent`}
      className={cn(
        "w-full overflow-hidden rounded-full bg-gray-200",
        sizeClasses[size],
        className,
      )}
    >
      <div
        className={cn(
          "h-full rounded-full bg-gradient-progress-recommend",
          animate &&
            "transition-[width] duration-1000 ease-out motion-reduce:transition-none",
        )}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
