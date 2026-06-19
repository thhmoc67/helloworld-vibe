import { load, type CashfreeInstance } from "@cashfreepayments/cashfree-js";
import type {
  InitBookingResponse,
  RazorpayPaymentResponse,
} from "@/src/models/booking";

const RAZORPAY_SCRIPT_URL = "https://checkout.razorpay.com/v1/checkout.js";
const RAZORPAY_LOGO_URL = "https://images.thehelloworld.com/icons/logo.png";

let cashfreePromise: Promise<CashfreeInstance> | null = null;
let razorpayScriptPromise: Promise<void> | null = null;

function getCashfreeMode(): "production" | "sandbox" {
  return process.env.NEXT_PUBLIC_ENV === "production" ? "production" : "sandbox";
}

export function preloadPaymentGateways() {
  void loadCashfree();
  void loadRazorpayScript();
}

export function loadCashfree() {
  if (!cashfreePromise) {
    cashfreePromise = load({ mode: getCashfreeMode() });
  }
  return cashfreePromise;
}

export function loadRazorpayScript() {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.Razorpay) {
    return Promise.resolve();
  }

  if (!razorpayScriptPromise) {
    razorpayScriptPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector<HTMLScriptElement>(
        `script[src="${RAZORPAY_SCRIPT_URL}"]`,
      );
      if (existing) {
        existing.addEventListener("load", () => resolve(), { once: true });
        existing.addEventListener("error", () => reject(), { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = RAZORPAY_SCRIPT_URL;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load Razorpay"));
      document.body.appendChild(script);
    });
  }

  return razorpayScriptPromise;
}

export async function openCashfreeCheckout(initResponse: InitBookingResponse) {
  const cashfree = await loadCashfree();
  cashfree.checkout({
    paymentSessionId: initResponse.paymentObj.paymentSessionId,
    redirectTarget: "_modal",
  });
}

export type RazorpayPrefill = {
  name: string;
  email: string;
  contact: string;
};

export async function openRazorpayCheckout({
  initResponse,
  prefill,
  onSuccess,
  onFailure,
}: {
  initResponse: InitBookingResponse;
  prefill: RazorpayPrefill;
  onSuccess: (response: RazorpayPaymentResponse) => void;
  onFailure?: () => void;
}) {
  await loadRazorpayScript();

  if (!window.Razorpay) {
    throw new Error("Razorpay is not available");
  }

  const { paymentObj } = initResponse;
  const razorpay = new window.Razorpay({
    key: paymentObj.razaorpayKey,
    order_id: paymentObj.orderId,
    amount: paymentObj.amount,
    name: "Hello World",
    currency: "INR",
    description: "Booking",
    image: RAZORPAY_LOGO_URL,
    handler: onSuccess,
    prefill,
    notes: paymentObj.notes,
    theme: { color: "#000000" },
  });

  razorpay.on("payment.failed", () => {
    onFailure?.();
  });

  razorpay.open();
}

export function usesCashfree(initResponse: InitBookingResponse) {
  return Boolean(initResponse.paymentObj.paymentSessionId);
}
