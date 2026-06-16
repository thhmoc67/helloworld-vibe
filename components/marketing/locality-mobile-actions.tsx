"use client";

import { cn } from "@/src/lib/cn";

export function LocalityMobileActions({
  onShowDetails,
  className,
}: {
  onShowDetails: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 p-3 backdrop-blur-sm md:hidden",
        className,
      )}
    >
      <button
        type="button"
        onClick={onShowDetails}
        className="mx-auto flex h-11 w-full max-w-sm items-center justify-center gap-2 rounded-full bg-gray-900 px-6 text-sm font-semibold text-white"
      >
        Show Locality Details
        <svg aria-hidden viewBox="0 0 14 7" fill="none" className="size-3.5">
          <path
            d="M1 1.5 7 5.5 13 1.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
