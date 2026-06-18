"use client";

import { useEffect, useId, useRef, type KeyboardEvent } from "react";
import { cn } from "@/src/lib/cn";

export interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  error?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  onComplete?: (value: string) => void;
}

export function OtpInput({
  value,
  onChange,
  length = 6,
  error = false,
  disabled = false,
  autoFocus = false,
  onComplete,
}: OtpInputProps) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const groupId = useId();
  const digits = value.padEnd(length, " ").slice(0, length).split("");

  useEffect(() => {
    if (!autoFocus) return;

    const timer = window.setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [autoFocus]);

  function updateDigit(index: number, digit: string) {
    const sanitized = digit.replace(/\D/g, "").slice(-1);
    const next = [...digits.map((d) => (d === " " ? "" : d))];
    next[index] = sanitized;
    const joined = next.join("").slice(0, length);
    onChange(joined);
    if (sanitized && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    if (joined.length === length) {
      onComplete?.(joined);
    }
  }

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !digits[index]?.trim() && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(event: React.ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);
    onChange(pasted);
    if (pasted.length === length) {
      onComplete?.(pasted);
    }
  }

  return (
    <div
      role="group"
      aria-labelledby={`${groupId}-label`}
      className="flex gap-2"
    >
      <span id={`${groupId}-label`} className="sr-only">
        One-time password
      </span>
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(element) => {
            inputRefs.current[index] = element;
          }}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={digit.trim()}
          disabled={disabled}
          aria-invalid={error}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={handlePaste}
          onChange={(event) => updateDigit(index, event.target.value)}
          className={cn(
            "size-11 rounded-xl border text-center text-lg font-semibold text-gray-900",
            "focus:border-hello-lime-300 focus:outline-none focus:ring-4 focus:ring-hello-lime-100",
            error ? "border-error-400" : "border-gray-300",
            disabled && "cursor-not-allowed bg-gray-50 text-gray-500",
          )}
        />
      ))}
    </div>
  );
}
