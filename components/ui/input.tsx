import type { InputHTMLAttributes, ReactNode } from "react";
import { useId } from "react";
import { cn } from "@/src/lib/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: boolean;
  iconLeading?: ReactNode;
  iconTrailing?: ReactNode;
}

function AlertCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <path
        d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8C14.6667 4.3181 11.6819 1.33333 8 1.33333C4.3181 1.33333 1.33333 4.3181 1.33333 8C1.33333 11.6819 4.3181 14.6667 8 14.6667Z"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 5.33333V8"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 10.6667H8.00667"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Input({
  label,
  hint,
  error = false,
  iconLeading,
  iconTrailing,
  className,
  disabled,
  readOnly,
  id: idProp,
  ...props
}: InputProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const hintId = hint ? `${id}-hint` : undefined;
  const showErrorIcon = error && !iconTrailing;

  return (
    <div className="flex w-full flex-col gap-1.5">
      {label ? (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      ) : null}

      <div className="relative">
        {iconLeading ? (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500">
            {iconLeading}
          </span>
        ) : null}

        <input
          id={id}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={error || undefined}
          aria-describedby={hintId}
          className={cn(
            "h-10 w-full rounded-lg border bg-white px-3.5 text-sm shadow-xs transition-colors",
            "text-gray-900 placeholder:text-gray-500",
            "focus:outline-none focus:ring-4",
            "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",
            "read-only:cursor-default read-only:bg-gray-50 read-only:text-gray-500",
            iconLeading ? "pl-10" : undefined,
            iconTrailing || showErrorIcon ? "pr-10" : undefined,
            error
              ? "border-error-300 hover:border-error-400 focus:border-error-300 focus:ring-error-100"
              : "border-gray-300 hover:border-gray-400 focus:border-hello-lime-300 focus:ring-hello-lime-100",
            className,
          )}
          {...props}
        />

        {showErrorIcon ? (
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-error-500">
            <AlertCircleIcon className="size-4" />
          </span>
        ) : iconTrailing ? (
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500">
            {iconTrailing}
          </span>
        ) : null}
      </div>

      {hint ? (
        <p
          id={hintId}
          className={cn(
            "text-sm",
            error ? "text-error-600" : "text-gray-600",
          )}
        >
          {hint}
        </p>
      ) : null}
    </div>
  );
}
