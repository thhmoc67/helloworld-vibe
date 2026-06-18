"use client";

import { cn } from "@/src/lib/cn";

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      className="size-8"
    >
      <path
        d="M12 2.5 14.9 9h7.3l-5.9 4.3 2.3 7.1L12 17.8 5.4 20.4l2.3-7.1L1.8 9h7.3L12 2.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  className?: string;
}

export function StarRating({
  value,
  onChange,
  disabled = false,
  className,
}: StarRatingProps) {
  return (
    <div className={cn("flex items-center justify-center gap-1", className)}>
      {Array.from({ length: 5 }, (_, index) => {
        const rating = index + 1;
        const filled = rating <= value;

        return (
          <button
            key={rating}
            type="button"
            disabled={disabled || !onChange}
            aria-label={`Rate ${rating} out of 5`}
            onClick={() => onChange?.(rating)}
            className={cn(
              "rounded-full p-0.5 transition-colors",
              filled ? "text-hello-lime-500" : "text-gray-300",
              onChange && !disabled && "hover:text-hello-lime-400",
              disabled && "cursor-default",
            )}
          >
            <StarIcon filled={filled} />
          </button>
        );
      })}
    </div>
  );
}
