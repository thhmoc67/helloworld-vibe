"use client";

import Image from "next/image";
import { useState } from "react";
import { ScheduleVisitFlow } from "@/components/booking/schedule-visit-flow";
import { Button } from "@/components/ui/button";
import type { HdpPageView } from "@/src/lib/hdp/hdp-page-view";
import {
  hdpOccupancies,
  hdpProperty,
  hdpRoomTypes,
  type HdpOccupancy,
  type HdpRoomType,
} from "@/src/tokens/hdp";
import { cn } from "@/src/lib/cn";

type BookingMode = "tour" | "book";

function formatRent(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}/mo`;
}

function HdpBookingTourPanel({ view }: { view: HdpPageView }) {
  return (
    <div className="mt-6 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-medium text-[#0a0e14]/50">
            Rent Starting From
          </p>
          <p className="text-xl font-bold text-hello-lime-700">
            ₹{view.startingRent.toLocaleString("en-IN")}/month
          </p>
        </div>

        <div className="h-14 w-px shrink-0 bg-gray-300" aria-hidden />

        <div className="min-w-0 flex-1 px-4">
          <p className="text-[13px] font-medium text-[#0a0e14]/50">
            Security Deposit
          </p>
          <p className="text-xl font-bold text-[#0a0e14]">
            {view.securityDepositLabel}
          </p>
        </div>
      </div>

      <ScheduleVisitFlow
        propertyId={view.propertyId}
        propertyName={view.displayName}
        propertyUrl={view.propertyUrl}
        layout="embedded"
      />

      <div className="flex flex-wrap items-center justify-center gap-2 text-base font-medium text-black">
        <span className="inline-flex items-center gap-2">
          <Image
            src="/assets/homepage-website/no-brokerage.svg"
            alt=""
            width={17}
            height={16}
            className="size-4"
          />
          No Brokerage
        </span>
        <span aria-hidden className="text-sm text-gray-400">
          |
        </span>
        <span className="inline-flex items-center gap-2">
          <Image
            src="/assets/homepage-website/no-lockin-period.svg"
            alt=""
            width={17}
            height={16}
            className="size-4"
          />
          No Lock-in Period
        </span>
      </div>
    </div>
  );
}

export function HdpBookingCard({
  view,
  className,
}: {
  view?: HdpPageView;
  className?: string;
}) {
  const resolvedView: HdpPageView = view ?? {
    propertyId: hdpProperty.propertyId,
    pageTitle: hdpProperty.name,
    displayName: hdpProperty.name,
    name: hdpProperty.name,
    badge: hdpProperty.badge,
    locality: hdpProperty.locality,
    startingRent: hdpProperty.startingRent,
    securityDepositMonths: 1,
    securityDepositLabel: hdpProperty.securityDepositLabel,
    minStayMonths: hdpProperty.minStayMonths,
    rating: hdpProperty.rating,
    reviewCount: hdpProperty.reviewCount,
    visitsToday: hdpProperty.visitsToday,
    about: "",
    amenities: [],
    galleryImages: [],
    propertyUrl: "",
    soldOut: false,
    roomTypes: hdpRoomTypes,
    nearbyItems: [],
    reviewSummary: null,
    residentReviews: [],
  };

  const roomTypes: readonly HdpRoomType[] =
    resolvedView.roomTypes.length > 0 ? resolvedView.roomTypes : hdpRoomTypes;

  const [mode, setMode] = useState<BookingMode>("tour");
  const [occupancy, setOccupancy] = useState<HdpOccupancy>("private");
  const [selectedRoomId, setSelectedRoomId] = useState(roomTypes[0]?.id);

  return (
    <aside
      className={cn(
        "rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_2px_10px_rgba(134,144,163,0.4)]",
        className,
      )}
      aria-label="Booking actions"
    >
      <div className="flex rounded-full bg-gray-200 p-1">
        {(["tour", "book"] as const).map((value) => {
          const isActive = mode === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => setMode(value)}
              className={cn(
                "flex-1 rounded-full px-4 py-2 text-sm font-bold transition-colors",
                isActive
                  ? "bg-white text-gray-800 shadow-sm"
                  : "text-gray-500 hover:text-gray-700",
              )}
            >
              {value === "tour" ? "Take a Tour" : "Book Now"}
            </button>
          );
        })}
      </div>

      {mode === "tour" ? (
        <HdpBookingTourPanel view={resolvedView} />
      ) : (
        <div className="mt-4 space-y-4">
          <div className="space-y-3">
            <p className="text-base font-medium text-gray-900">
              Select your Occupancy
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {hdpOccupancies.map((item) => {
                const isActive = occupancy === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setOccupancy(item.id)}
                    className={cn(
                      "rounded-full px-3 py-2.5 text-sm font-semibold transition-colors",
                      isActive
                        ? "bg-blue-light-100 text-blue-light-800"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200",
                    )}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="max-h-64 space-y-3 overflow-y-auto pr-1">
            {roomTypes.map((room) => {
              const isSelected = selectedRoomId === room.id;
              return (
                <label
                  key={room.id}
                  className={cn(
                    "block cursor-pointer border-b border-gray-200 pb-3",
                    isSelected && "border-gray-300",
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="hdp-room"
                        checked={isSelected}
                        onChange={() => setSelectedRoomId(room.id)}
                        className="size-5 accent-gray-700"
                      />
                      <span className="text-base font-medium text-gray-800">
                        {room.name}
                      </span>
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                      {formatRent(room.rent)}
                    </span>
                  </div>
                  <p className="mt-1 pl-7 text-xs text-gray-500">
                    {room.features.join(" • ")}
                  </p>
                </label>
              );
            })}
          </div>

          <Button
            className="w-full bg-hello-lime-400 text-gray-900 hover:bg-hello-lime-500"
            size="lg"
            disabled={resolvedView.soldOut}
          >
            {resolvedView.soldOut ? "Sold Out" : "Book Now"}
          </Button>
          <p className="text-center text-xs text-gray-500">
            Full Refund of Security Deposit requires a minimum{" "}
            {resolvedView.minStayMonths}-month stay.
          </p>
        </div>
      )}
    </aside>
  );
}
