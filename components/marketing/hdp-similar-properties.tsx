"use client";

import { SrpCard } from "@/components/marketing/srp-card";
import { hdpSimilarProperties } from "@/src/tokens/hdp";
import { cn } from "@/src/lib/cn";

export function HdpSimilarProperties({ className }: { className?: string }) {
  return (
    <section
      className={cn("space-y-6", className)}
      aria-label="Similar properties section"
    >
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
          Similar Properties
        </h2>
      </div>

      <div className="hidden gap-6 lg:grid lg:grid-cols-3">
        {hdpSimilarProperties.map((property) => (
          <SrpCard
            key={property.id}
            name={property.name}
            subtitle={property.subtitle}
            images={property.images}
            rating={property.rating}
            roomTypes={property.roomTypes}
            rent={property.rent}
            originalRent={property.originalRent}
            offerLabel={property.offerLabel}
            statusLabel={property.statusLabel}
            visitsToday={property.visitsToday}
            genderLabel={property.genderLabel}
          />
        ))}
      </div>

      <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 scrollbar-none lg:hidden">
        {hdpSimilarProperties.map((property) => (
          <SrpCard
            key={property.id}
            className="w-[min(342px,85vw)] shrink-0"
            name={property.name}
            subtitle={property.subtitle}
            images={property.images}
            rating={property.rating}
            roomTypes={property.roomTypes}
            rent={property.rent}
            originalRent={property.originalRent}
            offerLabel={property.offerLabel}
            statusLabel={property.statusLabel}
            visitsToday={property.visitsToday}
            genderLabel={property.genderLabel}
          />
        ))}
      </div>
    </section>
  );
}
