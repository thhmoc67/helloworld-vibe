"use client";

import { useId, type InputHTMLAttributes } from "react";
import { cn } from "@/src/lib/cn";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 12 12" fill="none" className={className}>
      <path
        d="M2.5 6 5 8.5 9.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface FilterCheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  className?: string;
}

export function FilterCheckbox({
  label,
  checked,
  className,
  id,
  onChange,
  ...props
}: FilterCheckboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <label
      htmlFor={inputId}
      className={cn(
        "inline-flex cursor-pointer items-center gap-2.5",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded-md border bg-white transition-colors",
          checked ? "border-gray-700" : "border-gray-200",
        )}
      >
        {checked ? <CheckIcon className="size-3 text-gray-700" /> : null}
      </span>
      <input
        {...props}
        id={inputId}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </label>
  );
}
