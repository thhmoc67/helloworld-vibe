"use client";

import { useId } from "react";
import { cn } from "@/src/lib/cn";
import { formatRupee } from "@/src/lib/booking/pricing";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 12 12" fill="none" className={className}>
      <path
        d="M2.5 6 5 8.5 9.5 3.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SelectionCheck({
  checked,
  className,
}: {
  checked: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex size-5 shrink-0 items-center justify-center rounded-[6px] border-2 bg-white transition-colors",
        checked ? "border-hello-lime-600" : "border-gray-300",
        className,
      )}
    >
      {checked ? <CheckIcon className="size-3 text-hello-lime-600" /> : null}
    </span>
  );
}

export interface BookingPaymentOptionProps {
  id: string;
  title: string;
  description: string;
  amount: number;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}

export function BookingPaymentOption({
  id,
  title,
  description,
  amount,
  checked,
  disabled = false,
  onChange,
}: BookingPaymentOptionProps) {
  const inputId = useId();

  return (
    <label
      htmlFor={inputId}
      className={cn(
        "flex cursor-pointer items-center gap-4 rounded-xl border px-4 py-3.5 transition-colors",
        checked
          ? "border-hello-lime-400 bg-hello-lime-50/40"
          : "border-gray-200 bg-white hover:border-gray-300",
        disabled && !checked && "cursor-not-allowed opacity-60",
        disabled && checked && "cursor-default",
      )}
    >
      <SelectionCheck checked={checked} />
      <input
        id={inputId}
        type="checkbox"
        name={id}
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
        className="sr-only"
      />
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-gray-900">{title}</span>
        <span className="mt-0.5 block text-xs text-gray-500">{description}</span>
      </span>
      <span className="shrink-0 text-base font-bold text-gray-900">
        {formatRupee(amount)}
      </span>
    </label>
  );
}
