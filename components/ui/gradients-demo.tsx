"use client";

import type { ReactNode } from "react";
import { cn } from "@/src/lib/cn";
import { useAnimateOnView } from "@/src/lib/use-animate-on-view";
import {
  gradientStops,
  gradients,
  textGradients,
  type Gradient,
  type TextGradient,
} from "@/src/tokens/gradients";

const OPACITY_MS = 900;
const STAGGER_MS = 100;
const GRADIENT_FILL_DELAY_MS = 150;

const localityRatingCategories = [
  { emoji: "🚌", label: "Transit" },
  { emoji: "🍽️", label: "Dining" },
  { emoji: "🌙", label: "Night Life" },
  { emoji: "🏥", label: "Health" },
] as const;

function opacityTransitionStyle(
  isActive: boolean,
  shouldAnimate: boolean,
  delayMs = 0,
) {
  return {
    transitionDuration: `${OPACITY_MS}ms`,
    transitionDelay:
      shouldAnimate && isActive ? `${delayMs}ms` : "0ms",
  };
}

function OpacityFade({
  isActive,
  shouldAnimate,
  delayMs = 0,
  className,
  children,
}: {
  isActive: boolean;
  shouldAnimate: boolean;
  delayMs?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "transition-opacity ease-in-out motion-reduce:transition-none",
        shouldAnimate && (isActive ? "opacity-100" : "opacity-0"),
        className,
      )}
      style={opacityTransitionStyle(isActive, shouldAnimate, delayMs)}
    >
      {children}
    </div>
  );
}

function GradientFill({
  className,
  isActive,
  shouldAnimate,
  delayMs,
}: {
  className: string;
  isActive: boolean;
  shouldAnimate: boolean;
  delayMs: number;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        className,
        "transition-opacity ease-in-out motion-reduce:transition-none",
        shouldAnimate && (isActive ? "opacity-100" : "opacity-0"),
      )}
      style={opacityTransitionStyle(isActive, shouldAnimate, delayMs)}
    />
  );
}

function GradientSwatch({
  gradient,
  index,
  isActive,
  shouldAnimate,
}: {
  gradient: Gradient;
  index: number;
  isActive: boolean;
  shouldAnimate: boolean;
}) {
  const { variant, name, className, stops } = gradient;
  const rating = gradient.rating;
  const baseDelay = index * STAGGER_MS;
  const fillDelay = baseDelay + GRADIENT_FILL_DELAY_MS;
  const labelDelay = baseDelay + GRADIENT_FILL_DELAY_MS + 120;

  return (
    <div className="flex flex-col gap-4">
      <OpacityFade
        isActive={isActive}
        shouldAnimate={shouldAnimate}
        delayMs={baseDelay}
      >
        {variant === "banner" ? (
          <div className="w-full max-w-xs overflow-hidden rounded-2xl border border-gray-200">
            <div className="h-36 bg-gray-200" aria-hidden />
            <div className="relative flex items-center justify-center px-4 py-2.5">
              <GradientFill
                className={`absolute inset-0 ${className}`}
                isActive={isActive}
                shouldAnimate={shouldAnimate}
                delayMs={fillDelay}
              />
              <p className="relative z-10 text-sm text-gray-900">
                <span aria-hidden>✨ </span>
                <span className="font-bold">93%</span> Vibe Match
              </p>
            </div>
            <div className="h-10 bg-white" aria-hidden />
          </div>
        ) : variant === "ratings-bar" ? (
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl">
            <GradientFill
              className={`absolute inset-0 ${className}`}
              isActive={isActive}
              shouldAnimate={shouldAnimate}
              delayMs={fillDelay}
            />
            <div className="relative z-10 grid grid-cols-2 gap-3 px-3 py-4 sm:grid-cols-4 sm:gap-2 sm:px-4 sm:py-5">
              {localityRatingCategories.map((category) => (
                <div key={category.label} className="min-w-0 text-center">
                  <p className="text-base font-bold text-gray-900 sm:text-lg">
                    4.8 <span className="text-yelloworld-700">★</span>
                  </p>
                  <p className="mt-1 text-[11px] text-gray-600 sm:text-xs">
                    <span aria-hidden>{category.emoji} </span>
                    {category.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : variant === "tile" ? (
          <div className="relative h-44 w-full max-w-xs overflow-hidden rounded-3xl sm:h-52">
            <GradientFill
              className={`absolute inset-0 ${className}`}
              isActive={isActive}
              shouldAnimate={shouldAnimate}
              delayMs={fillDelay}
            />
            <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-6">
              <div>
                <p className="text-lg font-bold text-gray-900">
                  {rating} <span className="text-yelloworld-700">★</span>
                </p>
                <p className="mt-1 text-2xl font-bold text-gray-900">{name}</p>
              </div>
            </div>
          </div>
        ) : variant === "card" ? (
          <div className="relative w-full max-w-xs overflow-hidden rounded-3xl shadow-md">
            <GradientFill
              className={`absolute inset-0 ${className}`}
              isActive={isActive}
              shouldAnimate={shouldAnimate}
              delayMs={fillDelay}
            />
            <div className="relative z-10 p-6">
              <p className="text-center text-lg font-bold text-gray-900">
                Let us help you!
              </p>
              <div className="mt-6 space-y-3">
                <div className="h-10 rounded-lg border border-gray-200 bg-white" />
                <div className="h-10 rounded-lg border border-gray-200 bg-white" />
                <div className="h-10 rounded-lg border border-gray-200 bg-white" />
              </div>
            </div>
          </div>
        ) : variant === "cta" ? (
          <div className="relative h-12 w-full max-w-xs overflow-hidden rounded-xl">
            <GradientFill
              className={`absolute inset-0 ${className}`}
              isActive={isActive}
              shouldAnimate={shouldAnimate}
              delayMs={fillDelay}
            />
            <div className="relative z-10 flex h-full items-center justify-center px-6 text-sm font-bold text-gray-900">
              Request Callback
            </div>
          </div>
        ) : null}
      </OpacityFade>

      <OpacityFade
        isActive={isActive}
        shouldAnimate={shouldAnimate}
        delayMs={labelDelay}
        className="px-1"
      >
        <p className="text-sm font-medium text-gray-900">{className}</p>
        <p className="font-mono text-sm text-gray-500">
          {stops.join(" → ")}
        </p>
      </OpacityFade>
    </div>
  );
}

function TextGradientSwatch({
  gradient,
  index,
  isActive,
  shouldAnimate,
}: {
  gradient: TextGradient;
  index: number;
  isActive: boolean;
  shouldAnimate: boolean;
}) {
  const offsetIndex = gradients.length + index;
  const baseDelay = offsetIndex * STAGGER_MS;
  const textDelay = baseDelay + GRADIENT_FILL_DELAY_MS;
  const labelDelay = textDelay + 120;

  return (
    <OpacityFade
      isActive={isActive}
      shouldAnimate={shouldAnimate}
      delayMs={baseDelay}
      className="rounded-2xl border border-gray-200 bg-gray-25 p-6"
    >
      <div className="flex flex-col gap-4">
        <OpacityFade
          isActive={isActive}
          shouldAnimate={shouldAnimate}
          delayMs={textDelay}
          className="overflow-visible py-1"
        >
          <p className={`${gradient.fontClassName} ${gradient.className}`}>
            {gradient.sample}
          </p>
        </OpacityFade>
        <OpacityFade
          isActive={isActive}
          shouldAnimate={shouldAnimate}
          delayMs={labelDelay}
        >
          <p className="text-sm font-medium text-gray-900">
            {gradient.className}
          </p>
          <p className="font-mono text-sm text-gray-500">
            {gradient.stops.join(" → ")}
          </p>
        </OpacityFade>
      </div>
    </OpacityFade>
  );
}

export function GradientsDemo() {
  const { ref, isActive, shouldAnimate } = useAnimateOnView();
  const stopsBaseDelay =
    (gradients.length + textGradients.length) * STAGGER_MS;

  return (
    <div ref={ref} className="space-y-12">
      <div>
        <OpacityFade
          isActive={isActive}
          shouldAnimate={shouldAnimate}
          className="mb-6 text-lg font-semibold text-gray-900"
        >
          <h3>Background gradients</h3>
        </OpacityFade>
        <div className="flex flex-wrap gap-8">
          {gradients.map((gradient, index) => (
            <GradientSwatch
              key={gradient.id}
              gradient={gradient}
              index={index}
              isActive={isActive}
              shouldAnimate={shouldAnimate}
            />
          ))}
        </div>
      </div>

      <div>
        <OpacityFade
          isActive={isActive}
          shouldAnimate={shouldAnimate}
          delayMs={gradients.length * STAGGER_MS}
          className="mb-6 text-lg font-semibold text-gray-900"
        >
          <h3>Text gradients</h3>
        </OpacityFade>
        <div className="grid gap-6 sm:grid-cols-2">
          {textGradients.map((gradient, index) => (
            <TextGradientSwatch
              key={gradient.id}
              gradient={gradient}
              index={index}
              isActive={isActive}
              shouldAnimate={shouldAnimate}
            />
          ))}
        </div>
      </div>

      <OpacityFade
        isActive={isActive}
        shouldAnimate={shouldAnimate}
        delayMs={stopsBaseDelay}
        className="rounded-2xl border border-gray-200 bg-gray-25 p-6"
      >
        <h3 className="text-sm font-semibold text-gray-900">Stop tokens</h3>
        <div className="mt-4 flex flex-wrap gap-6">
          {Object.values(gradientStops).map((stop, index) => (
            <div key={stop.token} className="flex items-center gap-3">
              <OpacityFade
                isActive={isActive}
                shouldAnimate={shouldAnimate}
                delayMs={stopsBaseDelay + index * STAGGER_MS}
              >
                <span
                  className={`block size-10 rounded-lg border border-gray-200 ${stop.className}`}
                />
              </OpacityFade>
              <OpacityFade
                isActive={isActive}
                shouldAnimate={shouldAnimate}
                delayMs={stopsBaseDelay + index * STAGGER_MS + 80}
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {stop.token}
                  </p>
                  <p className="font-mono text-xs text-gray-500">{stop.hex}</p>
                </div>
              </OpacityFade>
            </div>
          ))}
        </div>
      </OpacityFade>
    </div>
  );
}
