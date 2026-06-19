"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { pageLayout } from "@/src/tokens/layout";
import { cn } from "@/src/lib/cn";

export function BookingSuccessContent({ propertyPath }: { propertyPath: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const moveInDate = searchParams.get("moveInDate") ?? "";
  const name = searchParams.get("name") ?? "there";
  const address = searchParams.get("address") ?? "";
  const mapUrl = searchParams.get("mapURL") ?? "";

  useEffect(() => {
    const bookingId = window.localStorage.getItem("booking_successfull");
    if (!bookingId) {
      router.replace(propertyPath);
      return;
    }
    window.localStorage.removeItem("booking_successfull");
  }, [propertyPath, router]);

  return (
    <main className={cn(pageLayout.containerWithTopPadding, "py-12 md:py-16")}>
      <div className="mx-auto max-w-lg rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <p className="text-4xl" aria-hidden>
          🎉
        </p>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">Booking Confirmed</h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          Hi {name}, your booking is confirmed
          {moveInDate ? (
            <>
              {" "}
              for move-in on{" "}
              <span className="font-semibold text-gray-900">{moveInDate}</span>
            </>
          ) : null}
          . Our property manager will be waiting for you.
        </p>
        {address ? (
          <p className="mt-2 text-sm text-gray-500">{address}</p>
        ) : null}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          {mapUrl ? (
            <Link
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-gray-300 bg-white px-5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              View on Map
            </Link>
          ) : null}
          <Link
            href={propertyPath}
            className="inline-flex h-11 items-center justify-center rounded-lg bg-hello-lime-400 px-5 text-sm font-semibold text-gray-900 hover:bg-hello-lime-500"
          >
            Back to Property
          </Link>
        </div>
      </div>
    </main>
  );
}
