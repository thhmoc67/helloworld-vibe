"use client";

import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { cn } from "@/src/lib/cn";

export type LottieAnimationProps = {
  src: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  ariaLabel?: string;
};

export function LottieAnimation({
  src,
  className,
  loop = true,
  autoplay = true,
  ariaLabel = "Animation",
}: LottieAnimationProps) {
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(src)
      .then((response) => response.json())
      .then((data) => {
        if (!cancelled) setAnimationData(data);
      })
      .catch(() => {
        if (!cancelled) setAnimationData(null);
      });

    return () => {
      cancelled = true;
    };
  }, [src]);

  if (!animationData) {
    return (
      <div
        aria-hidden
        className={cn("animate-pulse rounded-xl bg-gray-100", className)}
      />
    );
  }

  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      className={className}
      aria-label={ariaLabel}
    />
  );
}
