declare module "@cashfreepayments/cashfree-js" {
  export interface CashfreeOptions {
    mode: "production" | "sandbox";
  }

  export interface CheckoutOptions {
    paymentSessionId: string;
    redirectTarget?: "_self" | "_blank" | "_modal";
  }

  export interface CashfreeInstance {
    checkout(options: CheckoutOptions): void;
  }

  export function load(options: CashfreeOptions): Promise<CashfreeInstance>;
}
