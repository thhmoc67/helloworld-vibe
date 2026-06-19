declare module "@cashfreepayments/cashfree-js" {
  export interface CashfreeOptions {
    mode: "production" | "sandbox";
  }

  export interface CheckoutOptions {
    paymentSessionId: string;
    redirectTarget?: "_self" | "_blank" | "_modal";
  }

  export interface CashfreeCheckoutResult {
    error?: { message?: string };
    redirect?: boolean;
    paymentDetails?: { paymentMessage?: string };
  }

  export interface CashfreeInstance {
    checkout(options: CheckoutOptions): Promise<CashfreeCheckoutResult>;
  }

  export function load(options: CashfreeOptions): Promise<CashfreeInstance>;
}
