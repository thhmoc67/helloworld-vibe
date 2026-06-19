"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { pageLayout } from "@/src/tokens/layout";
import { cn } from "@/src/lib/cn";

export function BookingFailedContent({ propertyPath }: { propertyPath: string }) {
  const searchParams = useSearchParams();
  const failedReason =
    searchParams.get("failedReason") ??
    "Your payment could not be completed. Please try again.";

  return (
    <main className={cn(pageLayout.containerWithTopPadding, "py-12 md:py-16")}>
      <div className="mx-auto max-w-lg rounded-2xl border border-error-200 bg-error-25 p-8 text-center">
        <p className="text-4xl" aria-hidden>
          😕
        </p>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">Payment Failed</h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">{failedReason}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href={`${propertyPath}/booking`}
            className="inline-flex h-11 items-center justify-center rounded-lg bg-hello-lime-400 px-5 text-sm font-semibold text-gray-900 hover:bg-hello-lime-500"
          >
            Try Again
          </Link>
          <Link
            href={propertyPath}
            className="inline-flex h-11 items-center justify-center rounded-lg border border-gray-300 bg-white px-5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Back to Property
          </Link>
        </div>
      </div>
    </main>
  );
}
