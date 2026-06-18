"use client";

import { cn } from "@/src/lib/cn";

export type PriceRangeValue = readonly [number, number];

export interface PriceRangeSliderProps {
  min: number;
  max: number;
  value: PriceRangeValue;
  onChange: (value: PriceRangeValue) => void;
  step?: number;
  className?: string;
}

function clamp(value: number, floor: number, ceiling: number) {
  return Math.min(ceiling, Math.max(floor, value));
}

function toPercent(value: number, min: number, max: number) {
  if (max <= min) return 0;
  return ((value - min) / (max - min)) * 100;
}

function formatPriceAmount(amount: number) {
  return `₹ ${amount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}

function RangeGripIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 12 12" fill="none" className={className}>
      <path
        d="M4 3.5 2.5 5 4 6.5M8 3.5 9.5 5 8 6.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PriceValueBox({ label, amount }: { label: string; amount: number }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white px-4 py-3">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-1 text-lg font-bold tracking-tight text-gray-900">
        {formatPriceAmount(amount)}
      </p>
    </div>
  );
}

export function PriceRangeSlider({
  min,
  max,
  value,
  onChange,
  step = 100,
  className,
}: PriceRangeSliderProps) {
  const [minValue, maxValue] = value;
  const minPercent = toPercent(minValue, min, max);
  const maxPercent = toPercent(maxValue, min, max);
  const minThumbOnTop = minValue > max - (max - min) * 0.05;

  function updateMin(nextRaw: number) {
    const nextMin = clamp(nextRaw, min, maxValue - step);
    onChange([nextMin, maxValue]);
  }

  function updateMax(nextRaw: number) {
    const nextMax = clamp(nextRaw, minValue + step, max);
    onChange([minValue, nextMax]);
  }

  return (
    <div className={cn("space-y-5", className)}>
      <div className="relative mx-2.5 h-8">
        <div
          aria-hidden
          className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-gray-200"
        />

        <div
          aria-hidden
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-hello-lime-600"
          style={{
            left: `${minPercent}%`,
            width: `${Math.max(0, maxPercent - minPercent)}%`,
          }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 flex size-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-hello-lime-600 bg-white shadow-sm"
          style={{ left: `${minPercent}%` }}
        >
          <RangeGripIcon className="size-3 text-hello-lime-600" />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 flex size-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-hello-lime-600 bg-white shadow-sm"
          style={{ left: `${maxPercent}%` }}
        >
          <RangeGripIcon className="size-3 text-hello-lime-600" />
        </div>

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minValue}
          aria-label="Minimum price"
          onChange={(event) => updateMin(Number(event.target.value))}
          className="price-range-input absolute inset-0 w-full"
          style={{ zIndex: minThumbOnTop ? 40 : 30 }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxValue}
          aria-label="Maximum price"
          onChange={(event) => updateMax(Number(event.target.value))}
          className="price-range-input absolute inset-0 w-full"
          style={{ zIndex: minThumbOnTop ? 30 : 40 }}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <PriceValueBox label="Min price" amount={minValue} />
        <PriceValueBox label="Max price" amount={maxValue} />
      </div>
    </div>
  );
}
