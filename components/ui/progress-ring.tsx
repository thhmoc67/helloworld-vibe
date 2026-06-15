"use client";

import { useEffect, useId, useState } from "react";
import { cn } from "@/src/lib/cn";

export type ProgressRingVariant = "vibe" | "recommend";

export type ProgressRingSize = "sm" | "md" | "lg";

export interface ProgressRingProps {
  value: number;
  variant?: ProgressRingVariant;
  label?: string;
  size?: ProgressRingSize;
  animate?: boolean;
  className?: string;
}

const sizeConfig: Record<
  ProgressRingSize,
  { dimension: number; stroke: number; fontClass: string; labelClass: string }
> = {
  sm: {
    dimension: 88,
    stroke: 6,
    fontClass: "text-lg",
    labelClass: "text-sm",
  },
  md: {
    dimension: 120,
    stroke: 8,
    fontClass: "text-xl sm:text-2xl",
    labelClass: "text-sm sm:text-base",
  },
  lg: {
    dimension: 152,
    stroke: 10,
    fontClass: "text-2xl sm:text-3xl",
    labelClass: "text-base sm:text-lg",
  },
};

function clampValue(value: number) {
  return Math.min(100, Math.max(0, value));
}

export function ProgressRing({
  value,
  variant = "vibe",
  label,
  size = "md",
  animate = true,
  className,
}: ProgressRingProps) {
  const reactId = useId();
  const gradientId = `${reactId}-ring-gradient`;
  const { dimension, stroke, fontClass, labelClass } = sizeConfig[size];

  const radius = (100 - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const targetOffset = circumference * (1 - clampValue(value) / 100);

  const [strokeOffset, setStrokeOffset] = useState(
    animate ? circumference : targetOffset,
  );

  useEffect(() => {
    if (!animate) {
      setStrokeOffset(targetOffset);
      return;
    }

    const frame = requestAnimationFrame(() => {
      setStrokeOffset(targetOffset);
    });

    return () => cancelAnimationFrame(frame);
  }, [animate, targetOffset, circumference]);

  const isRecommend = variant === "recommend";

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 text-center",
        className,
      )}
    >
      <div
        className="relative shrink-0"
        style={{ width: dimension, height: dimension }}
        role="img"
        aria-label={`${clampValue(value)} percent`}
      >
        <svg
          viewBox="0 0 100 100"
          className="size-full -rotate-90"
          aria-hidden
        >
          <defs>
            {isRecommend ? (
              <linearGradient
                id={gradientId}
                x1="50%"
                y1="0%"
                x2="50%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#D9F99E" />
                <stop offset="100%" stopColor="#4C7B0C" />
              </linearGradient>
            ) : (
              <linearGradient
                id={gradientId}
                x1="0%"
                y1="100%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#378ADD" />
                <stop offset="50%" stopColor="#7F77DD" />
                <stop offset="100%" stopColor="#D4537E" />
              </linearGradient>
            )}
          </defs>

          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={isRecommend ? "#E9EAEB" : "#FFFFFF"}
            strokeWidth={stroke}
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeOffset}
            className={cn(
              animate && "transition-[stroke-dashoffset] duration-1000 ease-out motion-reduce:transition-none",
            )}
          />
        </svg>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {isRecommend ? (
            <span
              className={cn(
                "font-satoshi font-bold text-hello-lime-700",
                fontClass,
              )}
            >
              {clampValue(value)}%
            </span>
          ) : (
            <span
              className={cn(
                "font-satoshi font-bold text-gradient-score-vibe",
                fontClass,
              )}
            >
              {clampValue(value)}%
            </span>
          )}
        </div>
      </div>

      {label ? (
        <p
          className={cn(
            "max-w-48 font-satoshi font-medium text-gray-800",
            labelClass,
          )}
        >
          {label}
        </p>
      ) : null}
    </div>
  );
}
