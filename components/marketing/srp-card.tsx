"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/src/lib/cn";
import { formatRent } from "@/src/tokens/srp-card";

export interface SrpCardProps {
  name: string;
  subtitle: string;
  images: readonly string[];
  rating: number;
  roomTypes: readonly string[];
  rent: number;
  originalRent?: number;
  offerLabel?: string;
  visitsToday?: number;
  genderLabel?: string;
  saved?: boolean;
  className?: string;
  onRequestCallback?: () => void;
  onTakeTour?: () => void;
  onSaveToggle?: () => void;
  onShare?: () => void;
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      fill="none"
      className="size-4"
    >
      <path
        d={direction === "left" ? "M12.5 15L7.5 10L12.5 5" : "M7.5 15L12.5 10L7.5 5"}
        stroke="currentColor"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" fill="none" className={className}>
      <path
        d="M11.333 14v-1.333A2.667 2.667 0 0 0 8.667 10H3.333A2.667 2.667 0 0 0 .667 12.667V14M8.667 7.333a2.667 2.667 0 1 0 0-5.334 2.667 2.667 0 0 0 0 5.334ZM15.333 14v-1.333a2.667 2.667 0 0 0-2-2.576M10.667 1.757a2.667 2.667 0 0 1 0 5.182"
        stroke="currentColor"
        strokeWidth="1.33"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BedIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" fill="none" className={className}>
      <path
        d="M2 12.667V10a2.667 2.667 0 0 1 2.667-2.667h6.666A2.667 2.667 0 0 1 14 10v2.667M2 12.667h12M2 12.667v1.333M14 12.667v1.333M4.667 7.333V5.333a1.333 1.333 0 0 1 1.334-1.333h4a1.333 1.333 0 0 1 1.333 1.333v2"
        stroke="currentColor"
        strokeWidth="1.33"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartIcon({ filled }: { filled?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      fill={filled ? "currentColor" : "none"}
      className="size-5"
    >
      <path
        d="M10 17.5s-6.667-4.167-6.667-8.333A3.333 3.333 0 0 1 10 6.25a3.333 3.333 0 0 1 6.667 2.917c0 4.166-6.667 8.333-6.667 8.333Z"
        stroke="currentColor"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 20 20" fill="none" className={className}>
      <path
        d="M15 13.333a2.5 2.5 0 0 0-1.9.883l-5.267-3.05a2.5 2.5 0 0 0 0-1.566l5.267-3.05A2.5 2.5 0 1 0 12.5 3.75a2.483 2.483 0 0 0 .042.458l-5.267 3.05a2.5 2.5 0 1 0 0 3.658l5.267 3.05a2.483 2.483 0 0 0-.042.458 2.5 2.5 0 1 0 2.5-2.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PercentIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" fill="none" className={className}>
      <circle cx="4.667" cy="4.667" r="1.667" stroke="currentColor" strokeWidth="1.33" />
      <circle cx="11.333" cy="11.333" r="1.667" stroke="currentColor" strokeWidth="1.33" />
      <path
        d="M13.333 2.667 2.667 13.333"
        stroke="currentColor"
        strokeWidth="1.33"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SrpCardCarousel({
  images,
  alt,
}: {
  images: readonly string[];
  alt: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const slideCount = images.length;

  function goTo(direction: -1 | 1) {
    setActiveIndex((current) => (current + direction + slideCount) % slideCount);
  }

  return (
    <div className="relative aspect-[342/220] w-full overflow-hidden bg-gray-100">
      <Image
        src={images[activeIndex]}
        alt={`${alt} — photo ${activeIndex + 1} of ${slideCount}`}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, 342px"
      />

      {slideCount > 1 ? (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={() => goTo(-1)}
            className="absolute left-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-gray-900/40 text-white backdrop-blur-sm transition-colors hover:bg-gray-900/55"
          >
            <ChevronIcon direction="left" />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={() => goTo(1)}
            className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-gray-900/40 text-white backdrop-blur-sm transition-colors hover:bg-gray-900/55"
          >
            <ChevronIcon direction="right" />
          </button>

          <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-1.5">
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                aria-label={`Go to photo ${index + 1}`}
                aria-current={index === activeIndex}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "h-1.5 rounded-full bg-white/90 transition-all",
                  index === activeIndex ? "w-5" : "w-1.5 opacity-70",
                )}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

export function SrpCard({
  name,
  subtitle,
  images,
  rating,
  roomTypes,
  rent,
  originalRent,
  offerLabel,
  visitsToday,
  genderLabel,
  saved = false,
  className,
  onRequestCallback,
  onTakeTour,
  onSaveToggle,
  onShare,
}: SrpCardProps) {
  const hasOffer = originalRent != null && originalRent > rent;

  return (
    <article
      className={cn(
        "flex w-full max-w-[342px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md",
        className,
      )}
    >
      <div className="relative">
        <SrpCardCarousel images={images} alt={name} />

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
          {visitsToday != null ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F3F0FB] px-2.5 py-1 text-xs font-medium text-[#7F77DD]">
              <UsersIcon className="size-3.5" />
              {visitsToday} Visits today
            </span>
          ) : (
            <span aria-hidden />
          )}

          {genderLabel ? (
            <span className="rounded-full bg-blue-light-50 px-2.5 py-1 text-xs font-medium text-blue-light-700">
              {genderLabel}
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-bold leading-tight text-gray-900">{name}</h3>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-blue-light-50 px-2 py-0.5 text-sm font-semibold text-gray-900">
              {rating.toFixed(1)}
              <span className="text-yelloworld-700" aria-hidden>
                ★
              </span>
            </span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <p className="min-w-0 text-sm text-gray-600">{subtitle}</p>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                aria-label={saved ? "Remove from saved" : "Save property"}
                aria-pressed={saved}
                onClick={onSaveToggle}
                className={cn(
                  "transition-colors",
                  saved
                    ? "text-error-500"
                    : "text-gray-500 hover:text-gray-700",
                )}
              >
                <HeartIcon filled={saved} />
              </button>
              <button
                type="button"
                aria-label="Share property"
                onClick={onShare}
                className={cn(
                  "transition-colors",
                  saved
                    ? "text-hello-lime-600 hover:text-hello-lime-700"
                    : "text-gray-500 hover:text-gray-700",
                )}
              >
                <ShareIcon className="size-5" />
              </button>
            </div>
          </div>
        </div>

        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
          <BedIcon className="size-3.5 text-gray-500" />
          {roomTypes.join(" · ")}
        </span>

        <div className="space-y-1">
          <p className="text-xs text-gray-500">Starting Rent</p>
          <div className="flex flex-wrap items-center gap-2">
            {hasOffer ? (
              <span className="text-sm text-gray-400 line-through">
                {formatRent(originalRent)}
              </span>
            ) : null}
            <p className="text-xl font-bold text-gray-900">{formatRent(rent)}</p>
            {offerLabel ? (
              <span className="inline-flex items-center gap-1 rounded-md bg-blue-light-50 px-2 py-1 text-xs font-semibold text-blue-light-700">
                <span className="flex size-4 items-center justify-center rounded-full bg-blue-light-500 text-white">
                  <PercentIcon className="size-2.5" />
                </span>
                {offerLabel}
              </span>
            ) : null}
          </div>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-3">
          <Button
            hierarchy="secondary-gray"
            size="md"
            className="w-full"
            onClick={onRequestCallback}
          >
            Request Callback
          </Button>
          <Button
            hierarchy="primary"
            size="md"
            className="w-full bg-hello-lime-300 text-gray-900 ring-0 hover:bg-hello-lime-400 focus-visible:ring-hello-lime-100"
            onClick={onTakeTour}
          >
            Take a Tour
          </Button>
        </div>
      </div>
    </article>
  );
}
