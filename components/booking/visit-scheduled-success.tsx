"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/src/lib/cn";

export interface VisitScheduledSuccessProps {
  scheduledAt: string;
  onGotIt: () => void;
  className?: string;
}

export function VisitScheduledSuccess({
  scheduledAt,
  onGotIt,
  className,
}: VisitScheduledSuccessProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-gradient-to-b from-hello-lime-50 to-white px-4 py-8 text-center sm:px-6",
        className,
      )}
    >
      <div className="mx-auto flex justify-center">
        <Image
          src="/assets/hdp/tour-confirmed.png"
          alt=""
          width={120}
          height={120}
          className="h-28 w-auto object-contain"
          priority
        />
      </div>

      <h3 className="mt-6 text-xl font-bold text-gray-900 sm:text-2xl">
        🥳 Your Property Tour is Confirmed!
      </h3>

      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-600 sm:text-base">
        Your property tour is scheduled for{" "}
        <span className="font-semibold text-gray-900">{scheduledAt}</span>. Get
        ready to check out the space, explore the vibe, and see if it&apos;s the
        one. See you soon!
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/my-visits"
          className="inline-flex h-10 w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 text-sm font-semibold text-gray-700 shadow-xs ring-1 ring-gray-300 ring-inset transition-colors hover:bg-gray-50 hover:text-gray-800 sm:w-auto sm:min-w-[9.5rem]"
        >
          View My Tours
        </Link>
        <Button
          type="button"
          className="w-full sm:w-auto sm:min-w-[9.5rem]"
          onClick={onGotIt}
        >
          Got it!
        </Button>
      </div>
    </div>
  );
}
