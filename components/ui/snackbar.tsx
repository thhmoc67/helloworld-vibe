"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/src/lib/cn";

export type SnackbarAction = {
  label: string;
  href: string;
};

export interface SnackbarProps {
  open: boolean;
  message: ReactNode;
  action?: SnackbarAction;
  variant?: "default" | "error";
  onClose: () => void;
  autoHideDuration?: number;
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" fill="none" className={className}>
      <path
        d="M4 4l8 8M12 4 4 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Snackbar({
  open,
  message,
  action,
  variant = "default",
  onClose,
  autoHideDuration = 4000,
}: SnackbarProps) {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
      return () => cancelAnimationFrame(frame);
    }

    setVisible(false);
    const timer = window.setTimeout(() => setMounted(false), 200);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open || autoHideDuration <= 0) return;

    const timer = window.setTimeout(onClose, autoHideDuration);
    return () => window.clearTimeout(timer);
  }, [autoHideDuration, onClose, open]);

  if (!mounted || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 z-[70] flex justify-center px-4",
        "bottom-20 md:bottom-8",
        "pb-[env(safe-area-inset-bottom)]",
      )}
      role="status"
      aria-live="polite"
    >
      <div
        className={cn(
          "pointer-events-auto flex w-full max-w-lg items-center gap-3 rounded-2xl border px-4 py-3 shadow-xl",
          "transition-all duration-200 ease-out motion-reduce:transition-none",
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-3 opacity-0",
          variant === "error"
            ? "border-error-200 bg-error-50 text-error-800"
            : "border-gray-200 bg-gray-900 text-white",
        )}
      >
        <p className="min-w-0 flex-1 text-sm font-medium leading-5">
          {message}
        </p>

        {action ? (
          <Link
            href={action.href}
            onClick={onClose}
            className={cn(
              "shrink-0 text-sm font-semibold underline underline-offset-4",
              variant === "error"
                ? "text-error-700 hover:text-error-800"
                : "text-hello-lime-300 hover:text-hello-lime-200",
            )}
          >
            {action.label}
          </Link>
        ) : null}

        <button
          type="button"
          aria-label="Dismiss notification"
          onClick={onClose}
          className={cn(
            "inline-flex size-8 shrink-0 items-center justify-center rounded-full transition-colors",
            variant === "error"
              ? "text-error-600 hover:bg-error-100"
              : "text-white/80 hover:bg-white/10 hover:text-white",
          )}
        >
          <CloseIcon className="size-4" />
        </button>
      </div>
    </div>,
    document.body,
  );
}
