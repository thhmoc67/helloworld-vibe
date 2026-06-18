"use client";

import { WishlistSrpCard } from "@/components/marketing/wishlist-srp-card";
import { useOptionalPropertyActions } from "@/components/booking/property-actions-provider";
import { mapPropertyToSrpCard } from "@/src/lib/map-property";
import type { SimilarProperty } from "@/src/models/property";
import type { LocalityProperty } from "@/src/tokens/locality";
import { hdpSimilarProperties } from "@/src/tokens/hdp";
import { cn } from "@/src/lib/cn";

export function HdpSimilarProperties({
  properties,
  srpSlug,
  localitySlug,
  className,
}: {
  properties?: SimilarProperty[];
  srpSlug?: string;
  localitySlug?: string;
  className?: string;
}) {
  const propertyActions = useOptionalPropertyActions();
  const apiCards: LocalityProperty[] =
    properties && properties.length > 0
      ? properties.map((property) =>
          mapPropertyToSrpCard(
            property,
            property.locality || localitySlug?.replace(/-/g, " ") || "",
            {
              city: property.address?.city || property.city,
              locality: property.locality || localitySlug?.replace(/-/g, " "),
            },
          ),
        )
      : [];
  const usingApiCards = apiCards.length > 0;
  const cards = usingApiCards ? apiCards : hdpSimilarProperties;

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
        {cards.map((property) => (
          <WishlistSrpCard
            key={property.id}
            propertyId={
              usingApiCards
                ? (property as LocalityProperty).propertyId
                : undefined
            }
            href={property.href}
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
            onRequestCallback={
              usingApiCards && propertyActions
                ? () =>
                    propertyActions.openRequestCallback({
                      propertyId: (property as LocalityProperty).propertyId,
                      propertyName: property.name,
                      location: (property as LocalityProperty).location,
                      city: (property as LocalityProperty).city,
                    })
                : undefined
            }
            onTakeTour={
              usingApiCards && propertyActions
                ? () =>
                    propertyActions.openScheduleVisit({
                      propertyId: (property as LocalityProperty).propertyId,
                      propertyName: property.name,
                      propertyUrl: (property as LocalityProperty).propertyUrl,
                    })
                : undefined
            }
          />
        ))}
      </div>

      <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 scrollbar-none lg:hidden">
        {cards.map((property) => (
          <WishlistSrpCard
            key={property.id}
            propertyId={
              usingApiCards
                ? (property as LocalityProperty).propertyId
                : undefined
            }
            className="w-[min(342px,85vw)] shrink-0"
            href={property.href}
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
            onRequestCallback={
              usingApiCards && propertyActions
                ? () =>
                    propertyActions.openRequestCallback({
                      propertyId: (property as LocalityProperty).propertyId,
                      propertyName: property.name,
                      location: (property as LocalityProperty).location,
                      city: (property as LocalityProperty).city,
                    })
                : undefined
            }
            onTakeTour={
              usingApiCards && propertyActions
                ? () =>
                    propertyActions.openScheduleVisit({
                      propertyId: (property as LocalityProperty).propertyId,
                      propertyName: property.name,
                      propertyUrl: (property as LocalityProperty).propertyUrl,
                    })
                : undefined
            }
          />
        ))}
      </div>
    </section>
  );
}
