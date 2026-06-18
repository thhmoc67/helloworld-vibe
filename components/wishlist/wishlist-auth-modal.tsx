"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Modal, ModalDescription, ModalTitle } from "@/components/ui/modal";
import { OtpInput } from "@/components/ui/otp-input";
import { cn } from "@/src/lib/cn";

export interface WishlistAuthModalProps {
  open: boolean;
  onClose: () => void;
  loading?: boolean;
  errorMessage?: string | null;
  step: "phone" | "otp";
  phone: string;
  otp: string;
  onPhoneChange: (phone: string) => void;
  onOtpChange: (otp: string) => void;
  onSendOtp: () => void | Promise<void>;
  onVerifyOtp: () => void | Promise<void>;
}

function formatPhoneInput(value: string) {
  return value.replace(/\D/g, "").slice(0, 10);
}

export function WishlistAuthModal({
  open,
  onClose,
  loading = false,
  errorMessage,
  step,
  phone,
  otp,
  onPhoneChange,
  onOtpChange,
  onSendOtp,
  onVerifyOtp,
}: WishlistAuthModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const phoneInputId = useId();
  const phoneInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;

    const timer = window.setTimeout(() => {
      if (step === "phone") {
        phoneInputRef.current?.focus();
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, [open, step]);

  async function handlePhoneSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (phone.length !== 10 || loading) return;
    await onSendOtp();
  }

  async function handleOtpSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (otp.length !== 6 || loading) return;
    await onVerifyOtp();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      labelledBy={titleId}
      describedBy={descriptionId}
      closeLabel="Close login dialog"
      maxWidthClassName="max-w-md"
    >
      {step === "phone" ? (
        <>
          <ModalTitle id={titleId}>Save to wishlist</ModalTitle>
          <ModalDescription id={descriptionId}>
            Sign in with your mobile number to save properties for later.
          </ModalDescription>

          <form className="mt-8 space-y-6" onSubmit={handlePhoneSubmit}>
            <div className="space-y-2">
              <label
                htmlFor={phoneInputId}
                className="text-xs font-medium text-gray-500"
              >
                Please enter your phone number
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                  +91-
                </span>
                <input
                  ref={phoneInputRef}
                  id={phoneInputId}
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="9777964438"
                  value={phone}
                  disabled={loading}
                  onChange={(event) =>
                    onPhoneChange(formatPhoneInput(event.target.value))
                  }
                  className={cn(
                    "h-12 w-full rounded-xl border border-gray-300 bg-white pl-14 pr-4 text-base font-semibold text-gray-900 shadow-xs",
                    "placeholder:font-normal placeholder:text-gray-400",
                    "focus:border-hello-lime-300 focus:outline-none focus:ring-4 focus:ring-hello-lime-100",
                  )}
                />
              </div>
            </div>

            {errorMessage ? (
              <p className="text-sm text-error-600">{errorMessage}</p>
            ) : null}

            <Button
              type="submit"
              className="w-full"
              disabled={phone.length !== 10 || loading}
            >
              {loading ? "Sending OTP..." : "Continue"}
            </Button>
          </form>
        </>
      ) : (
        <>
          <ModalTitle id={titleId}>Verify your number</ModalTitle>
          <ModalDescription id={descriptionId}>
            Enter the 6-digit code sent to +91-{phone}.
          </ModalDescription>

          <form className="mt-8 space-y-6" onSubmit={handleOtpSubmit}>
            <OtpInput
              value={otp}
              onChange={onOtpChange}
              disabled={loading}
              error={Boolean(errorMessage)}
              autoFocus={open}
            />

            {errorMessage ? (
              <p className="text-sm text-error-600">{errorMessage}</p>
            ) : null}

            <Button
              type="submit"
              className="w-full"
              disabled={otp.length !== 6 || loading}
            >
              {loading ? "Verifying..." : "Verify and save"}
            </Button>
          </form>
        </>
      )}
    </Modal>
  );
}
