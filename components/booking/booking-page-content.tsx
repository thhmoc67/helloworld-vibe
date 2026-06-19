"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { BookingPaymentPanel } from "@/components/booking/booking-payment-panel";
import { BookingSelectionModal } from "@/components/booking/booking-selection-modal";
import { BookingSummaryCard } from "@/components/booking/booking-summary-card";
import { JsonLd } from "@/components/seo/json-ld";
import { getRentForOccupancy } from "@/src/lib/hdp/category-occupancy";
import {
  buildBookingHref,
  type BookingOccupantInfo,
  type BookingSelectionDetails,
} from "@/src/lib/booking/url";
import type { SelectedCategory, SharingType } from "@/src/models/booking";
import type { CategoryProps } from "@/src/models/category";
import type { Property } from "@/src/models/property";
import type { HdpPageSchema } from "@/src/lib/schema";
import type { HdpOccupancy } from "@/src/tokens/hdp";
import { pageLayout } from "@/src/tokens/layout";
import { cn } from "@/src/lib/cn";

function sharingTypeFromOccupancy(occupancy: HdpOccupancy): SharingType {
  return occupancy === "private" ? "private" : "sharing";
}

export function BookingPageContent({
  property,
  categories,
  categoryId,
  occupancy,
  moveInDate,
  occupantInfo,
  hdpPath,
  bookingPath,
  schema,
}: {
  property: Property;
  categories: CategoryProps[];
  categoryId: number;
  occupancy: HdpOccupancy;
  moveInDate: string;
  occupantInfo: BookingOccupantInfo;
  hdpPath: string;
  bookingPath: string;
  schema: HdpPageSchema;
}) {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const category = categories.find((item) => item.id === categoryId);

  function handleSelectionSave(details: BookingSelectionDetails) {
    router.push(
      buildBookingHref(bookingPath, {
        categoryId: details.categoryId,
        occupancy: details.occupancy,
        moveInDate,
        ...occupantInfo,
      }),
    );
  }

  if (!category) {
    return (
      <div className="bg-white">
        <SiteHeader />
        <main className={cn(pageLayout.containerWithTopPadding, "py-16 text-center")}>
          <p className="text-base text-gray-600">
            Selected room type is no longer available.{" "}
            <a href={hdpPath} className="font-medium text-hello-lime-700 hover:underline">
              Go back to the property page
            </a>
            .
          </p>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const selectedCategory: SelectedCategory = {
    ...category,
    type: sharingTypeFromOccupancy(occupancy),
  };
  const monthlyRent = getRentForOccupancy(category, occupancy);

  return (
    <div className="bg-white">
      <JsonLd schema={schema} />
      <SiteHeader />

      <main className={cn(pageLayout.containerWithTopPadding, "pb-12 md:pb-16")}>
        <div className="md:flex md:items-start md:justify-between md:gap-10">
          <div className="min-w-0 md:max-w-[62%]">
            <BookingPaymentPanel
              property={property}
              category={selectedCategory}
              moveInDate={moveInDate}
              sharingType={selectedCategory.type}
              propertyPath={hdpPath}
              occupantInfo={occupantInfo}
            />
          </div>

          <div className="mt-8 md:mt-0 md:w-[32%] md:shrink-0">
            <div className="md:sticky md:top-24">
              <BookingSummaryCard
                property={property}
                category={selectedCategory}
                occupancy={occupancy}
                monthlyRent={monthlyRent}
                moveInDate={moveInDate}
                onEdit={() => setEditOpen(true)}
              />
            </div>
          </div>
        </div>
      </main>

      <BookingSelectionModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        categories={categories}
        minStayMonths={property.lockin_period}
        soldOut={property.sold_out}
        initialCategoryId={categoryId}
        initialOccupancy={occupancy}
        onSave={handleSelectionSave}
      />

      <SiteFooter />
    </div>
  );
}
