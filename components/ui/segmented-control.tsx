"use client";

import { useId, type ReactNode } from "react";
import { cn } from "@/src/lib/cn";

export interface SegmentedControlOption<T extends string = string> {
  value: T;
  label: ReactNode;
}

export interface SegmentedControlProps<T extends string = string> {
  options: readonly SegmentedControlOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  name?: string;
  "aria-label"?: string;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className,
  name,
  "aria-label": ariaLabel,
}: SegmentedControlProps<T>) {
  const groupId = useId();
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn("relative grid rounded-full bg-gray-100 p-1", className)}
      style={{
        gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))`,
      }}
    >
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-1 left-1 rounded-full bg-white shadow-xs",
          "transition-transform duration-300 ease-in-out",
          "motion-reduce:transition-none",
        )}
        style={{
          width: `calc((100% - 8px) / ${options.length})`,
          transform: `translateX(calc(${selectedIndex} * 100%))`,
        }}
      />
      {options.map((option) => {
        const isSelected = option.value === value;
        const inputName = name ?? groupId;

        return (
          <label
            key={option.value}
            className={cn(
              "relative z-10 min-w-0 cursor-pointer rounded-full px-2 py-2 text-center text-xs font-semibold sm:px-4 sm:py-2.5 sm:text-sm",
              "transition-colors duration-300 motion-reduce:transition-none",
              isSelected
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-700",
            )}
          >
            <input
              type="radio"
              name={inputName}
              value={option.value}
              checked={isSelected}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            <span className="block truncate">{option.label}</span>
          </label>
        );
      })}
    </div>
  );
}

export const localityViewOptions = [
  { value: "coliving-pgs", label: "Coliving PGs" },
  { value: "locality-details", label: "Locality Details" },
] as const;

export type LocalityView = (typeof localityViewOptions)[number]["value"];
