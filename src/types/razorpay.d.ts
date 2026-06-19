import type { RazorpayPaymentResponse } from "@/src/models/booking";

export interface RazorpayConstructorOptions {
  key: string;
  order_id: string;
  amount: number;
  name: string;
  currency: string;
  description: string;
  image: string;
  handler: (response: RazorpayPaymentResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, unknown>;
  theme?: {
    color?: string;
  };
}

export interface RazorpayInstance {
  open(): void;
  on(event: "payment.failed", handler: () => void): void;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayConstructorOptions) => RazorpayInstance;
  }
}

export {};
