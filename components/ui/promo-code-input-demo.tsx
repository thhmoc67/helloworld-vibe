"use client";

import { PromoCodeInput } from "@/components/ui/promo-code-input";

const validCodes: Record<string, number> = {
  GHHCSCAC: 1500,
  SRTGHDCH: 500,
};

async function mockApply(code: string) {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const discountAmount = validCodes[code.toUpperCase()];
  if (discountAmount) {
    return {
      success: true as const,
      discountAmount,
    };
  }

  return {
    success: false as const,
    message: "This code is invalid or has expired. Please check and try again.",
  };
}

export function PromoCodeInputDemo() {
  return (
    <div className="space-y-8">
      <div className="grid w-full max-w-3xl gap-8 sm:grid-cols-2">
        <PromoCodeInput
          label="Referral Code"
          defaultValue="SRTGHDCH"
          onApply={mockApply}
          placeholder="Enter referral code"
        />
        <PromoCodeInput
          label="Coupon Code"
          defaultApplied={{
            code: "GHHCSCAC",
            discountAmount: 1500,
          }}
          onApply={mockApply}
          placeholder="Enter coupon code"
        />
      </div>
      <p className="max-w-3xl text-sm text-gray-500">
        Try invalid codes to see the error state. Valid demo codes:{" "}
        <span className="font-mono text-gray-700">SRTGHDCH</span>,{" "}
        <span className="font-mono text-gray-700">GHHCSCAC</span>.
      </p>
    </div>
  );
}
