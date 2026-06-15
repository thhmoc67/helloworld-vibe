"use client";

import { useState } from "react";
import { SrpCard } from "@/components/marketing/srp-card";
import { srpCardVariants, type SrpCardVariantId } from "@/src/tokens/srp-card";

export function SrpCardDemo() {
  const [savedByVariant, setSavedByVariant] = useState<
    Record<SrpCardVariantId, boolean>
  >({
    default: srpCardVariants.default.saved,
    saved: srpCardVariants.saved.saved,
    offer: srpCardVariants.offer.saved,
  });

  return (
    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
      {(Object.keys(srpCardVariants) as SrpCardVariantId[]).map((variantId) => {
        const variant = srpCardVariants[variantId];
        const saved = savedByVariant[variantId];

        return (
          <div key={variantId} className="flex flex-col items-center gap-4">
            <p className="text-sm font-semibold text-gray-700">{variant.label}</p>
            <SrpCard
              name={variant.name}
              subtitle={variant.subtitle}
              images={variant.images}
              rating={variant.rating}
              roomTypes={variant.roomTypes}
              rent={variant.rent}
              originalRent={"originalRent" in variant ? variant.originalRent : undefined}
              offerLabel={"offerLabel" in variant ? variant.offerLabel : undefined}
              visitsToday={"visitsToday" in variant ? variant.visitsToday : undefined}
              genderLabel={"genderLabel" in variant ? variant.genderLabel : undefined}
              saved={saved}
              onSaveToggle={() =>
                setSavedByVariant((current) => ({
                  ...current,
                  [variantId]: !current[variantId],
                }))
              }
            />
          </div>
        );
      })}
    </div>
  );
}
