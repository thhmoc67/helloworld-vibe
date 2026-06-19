"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { postInitBooking, postVerifyBooking } from "@/src/apis/booking";
import type { BookingOccupantInfo } from "@/src/lib/booking/url";
import {
  openCashfreeCheckout,
  openRazorpayCheckout,
  preloadPaymentGateways,
  usesCashfree,
} from "@/src/lib/booking/payment-gateways";
import type {
  InitBookingResponse,
  PostInitBookingPayload,
  RazorpayPaymentResponse,
} from "@/src/models/booking";
import { cn } from "@/src/lib/cn";

export interface BookingPaymentCheckoutProps {
  amount: number;
  initPayload: PostInitBookingPayload;
  occupantInfo: BookingOccupantInfo;
  propertyPath: string;
  moveInDate: string;
  propertyAddress: string;
  mapUrl?: string;
  disabled?: boolean;
  onError?: (message: string) => void;
  className?: string;
}

function buildSuccessHref({
  propertyPath,
  moveInDate,
  occupantInfo,
  propertyAddress,
  mapUrl,
}: {
  propertyPath: string;
  moveInDate: string;
  occupantInfo: BookingOccupantInfo;
  propertyAddress: string;
  mapUrl?: string;
}) {
  const params = new URLSearchParams({
    moveInDate,
    name: `${occupantInfo.firstName} ${occupantInfo.lastName}`.trim(),
    address: propertyAddress,
  });
  if (mapUrl) params.set("mapURL", mapUrl);
  return `${propertyPath}/booking/success?${params.toString()}`;
}

function buildFailedHref({
  propertyPath,
  message,
}: {
  propertyPath: string;
  message: string;
}) {
  const params = new URLSearchParams({
    failedReason: message,
    type: "booking",
    propertyURL: propertyPath,
  });
  return `${propertyPath}/booking/failed?${params.toString()}`;
}

export function BookingPaymentCheckout({
  amount,
  initPayload,
  occupantInfo,
  propertyPath,
  moveInDate,
  propertyAddress,
  mapUrl,
  disabled = false,
  onError,
  className,
}: BookingPaymentCheckoutProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    preloadPaymentGateways();
  }, []);

  async function verifyRazorpayPayment(
    razorpayResponse: RazorpayPaymentResponse,
    initResponse: InitBookingResponse,
  ) {
    setLoading(true);

    const verifyResponse = await postVerifyBooking({
      paymentId: initResponse.paymentObj.transactionId,
      razorpayPaymentId: razorpayResponse.razorpay_payment_id,
      razorpaySignature: razorpayResponse.razorpay_signature,
      amount,
      bookingId: initResponse.id,
    });

    setLoading(false);

    if (verifyResponse?.success) {
      router.push(
        buildSuccessHref({
          propertyPath,
          moveInDate,
          occupantInfo,
          propertyAddress,
          mapUrl,
        }),
      );
      return;
    }

    const message =
      verifyResponse?.message ?? "Payment verification failed. Please try again.";
    onError?.(message);
    router.push(buildFailedHref({ propertyPath, message }));
  }

  async function openGateway(initResponse: InitBookingResponse) {
    if (usesCashfree(initResponse)) {
      await openCashfreeCheckout(initResponse);
      return;
    }

    await openRazorpayCheckout({
      initResponse,
      prefill: {
        name: `${occupantInfo.firstName} ${occupantInfo.lastName}`.trim(),
        email: occupantInfo.email,
        contact: occupantInfo.phone,
      },
      onSuccess: (response) => {
        void verifyRazorpayPayment(response, initResponse);
      },
      onFailure: () => {
        setLoading(false);
        onError?.("Payment failed. Please try again.");
      },
    });
  }

  async function handlePayNow() {
    setLoading(true);
    onError?.("");

    try {
      const response = await postInitBooking(initPayload);

      if (!response?.success || !response?.data) {
        const message = response?.message ?? "Payment could not be initiated.";
        onError?.(message);
        setLoading(false);
        return;
      }

      const initResponse = response.data as InitBookingResponse;
      await openGateway(initResponse);
    } catch {
      onError?.("Something went wrong while starting payment. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      size="xl"
      className={cn(
        "w-full bg-hello-lime-400 text-gray-900 hover:bg-hello-lime-500 sm:w-auto sm:min-w-[10rem]",
        className,
      )}
      disabled={disabled || loading}
      onClick={() => void handlePayNow()}
      aria-busy={loading}
    >
      {loading ? "Processing..." : `Pay Now`}
    </Button>
  );
}
