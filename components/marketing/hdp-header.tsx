"use client";

import Image from "next/image";
import type { HdpPageView } from "@/src/lib/hdp/hdp-page-view";
import { useOptionalWishlist } from "@/components/wishlist/wishlist-provider";
import { hdpProperty } from "@/src/tokens/hdp";
import { cn } from "@/src/lib/cn";

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

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" fill="none" className={className}>
      <path
        d="M8 8.667a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
        stroke="currentColor"
        strokeWidth="1.33"
      />
      <path
        d="M8 14.667s5.333-3.58 5.333-8A5.333 5.333 0 1 0 2.667 6.667c0 4.42 5.333 8 5.333 8Z"
        stroke="currentColor"
        strokeWidth="1.33"
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
      className="size-4"
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

export function HdpHeader({
  view,
  className,
}: {
  view?: HdpPageView;
  className?: string;
}) {
  const pageTitle = view?.pageTitle ?? hdpProperty.name;
  const badge = view?.badge ?? hdpProperty.badge;
  const locality = view?.locality ?? hdpProperty.locality;
  const startingRent = view?.startingRent ?? hdpProperty.startingRent;
  const mapUrl = view?.mapUrl;
  const propertyId = view?.propertyId ?? hdpProperty.propertyId;
  const wishlist = useOptionalWishlist();
  const saved = wishlist?.isWishlisted(propertyId) ?? false;

  async function handleShare() {
    if (typeof window === "undefined") return;
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: pageTitle, url });
        return;
      }
      await navigator.clipboard?.writeText(url);
    } catch {
      // User dismissed native share sheet.
    }
  }

  return (
    <header className={cn("space-y-4 md:space-y-6", className)}>
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-satoshi text-2xl font-bold text-gray-800 md:text-3xl">
              {pageTitle}
            </h1>
            {badge ? (
              <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-700">
                {badge}
              </span>
            ) : null}
          </div>
          <p className="text-base font-medium text-gray-600 md:text-lg">
            {locality}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-4 self-start">
          {mapUrl ? (
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800 underline-offset-4 hover:underline"
            >
              <MapPinIcon className="size-4" />
              Show on Maps
            </a>
          ) : (
            <button
              type="button"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800 underline-offset-4 hover:underline"
            >
              <MapPinIcon className="size-4" />
              Show on Maps
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              void wishlist?.toggleWishlist(propertyId, pageTitle);
            }}
            aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
            aria-pressed={saved}
            className={cn(
              "inline-flex size-9 items-center justify-center rounded-full border transition-colors",
              saved
                ? "border-error-200 bg-error-50 text-error-500 hover:border-error-300"
                : "border-gray-900 text-gray-900 hover:border-gray-700 hover:text-gray-700",
            )}
          >
            <HeartIcon filled={saved} />
          </button>
          <button
            type="button"
            onClick={handleShare}
            aria-label={`Share ${pageTitle}`}
            className="inline-flex size-9 items-center justify-center rounded-full border border-gray-900 text-gray-900 transition-colors hover:border-gray-700 hover:text-gray-700"
          >
            <ShareIcon className="size-4" />
          </button>
        </div>
      </div>

      <div className="md:hidden">
        <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
          <div>
            <p className="text-xs font-medium text-gray-500">Rent starting from</p>
            <p className="text-lg font-bold text-hello-lime-800">
              ₹{startingRent.toLocaleString("en-IN")}/month
            </p>
          </div>
          <Image
            src={hdpProperty.trophySrc}
            alt=""
            width={48}
            height={48}
            className="size-12 object-contain"
          />
        </div>
      </div>
    </header>
  );
}
