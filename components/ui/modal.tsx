"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/src/lib/cn";

const MODAL_TRANSITION_MS = 300;

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  maxWidthClassName?: string;
  labelledBy?: string;
  describedBy?: string;
  closeLabel?: string;
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        d="M15 5 5 15M5 5l10 10"
        stroke="currentColor"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Modal({
  open,
  onClose,
  children,
  className,
  maxWidthClassName,
  labelledBy,
  describedBy,
  closeLabel = "Close dialog",
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
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
    const timer = window.setTimeout(() => setMounted(false), MODAL_TRANSITION_MS);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mounted, onClose]);

  useEffect(() => {
    if (visible) {
      panelRef.current?.focus();
    }
  }, [visible]);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6",
        !visible && "pointer-events-none",
      )}
    >
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-gray-900/60 backdrop-blur-[2px]",
          "transition-opacity duration-300 ease-out motion-reduce:transition-none",
          visible ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        className={cn(
          "relative w-full max-w-[400px]",
          maxWidthClassName,
          "transition-all duration-300 ease-out motion-reduce:transition-none",
          visible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-4 scale-95 opacity-0",
        )}
      >
        <button
          type="button"
          aria-label={closeLabel}
          onClick={onClose}
          className="absolute -right-1 -top-1 z-10 flex size-10 items-center justify-center rounded-full bg-gray-900 text-white shadow-lg transition-colors hover:bg-gray-800 sm:-right-4 sm:-top-12"
        >
          <CloseIcon className="size-5" />
        </button>

        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelledBy}
          aria-describedby={describedBy}
          tabIndex={-1}
          className={cn(
            "relative max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-3xl bg-white p-6 shadow-xl outline-none sm:p-10",
            className,
          )}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function ModalTitle({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      id={id}
      className={cn("text-2xl font-bold tracking-tight text-gray-900", className)}
    >
      {children}
    </h2>
  );
}

export function ModalDescription({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <p id={id} className={cn("mt-2 text-sm text-gray-600", className)}>
      {children}
    </p>
  );
}
