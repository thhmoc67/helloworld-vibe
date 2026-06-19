"use client";

import { Button } from "@/components/ui/button";
import type { HdpPageView } from "@/src/lib/hdp/hdp-page-view";
import { cn } from "@/src/lib/cn";

export function HdpMobileActions({
  view,
  className,
}: {
  view?: HdpPageView;
  className?: string;
}) {
  function scrollToBookingCard() {
    const card = document.getElementById("hdp-booking-card");
    card?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <footer
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white p-4 md:hidden",
        className,
      )}
      aria-label="Mobile booking actions"
    >
      <div className="mx-auto flex max-w-lg gap-2">
        <Button
          hierarchy="secondary-gray"
          size="sm"
          className="w-1/2"
          onClick={scrollToBookingCard}
        >
          Book free visit
        </Button>
        <Button
          size="sm"
          className="w-1/2 bg-hello-lime-400 text-gray-900 hover:bg-hello-lime-500"
          disabled={view?.soldOut}
          onClick={scrollToBookingCard}
        >
          {view?.soldOut ? "Sold out" : "Book now"}
        </Button>
      </div>
    </footer>
  );
}
