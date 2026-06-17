import Image from "next/image";
import type { HdpPageView } from "@/src/lib/hdp/hdp-page-view";
import { hdpProperty } from "@/src/tokens/hdp";
import { cn } from "@/src/lib/cn";

function Stat({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}

export function HdpRatingCard({
  view,
  className,
}: {
  view?: HdpPageView;
  className?: string;
}) {
  const displayName = view?.displayName ?? hdpProperty.name;
  const trendingLabel = view?.trendingLabel ?? hdpProperty.trendingLabel;
  const topChoiceCopy = view?.topChoiceCopy ?? hdpProperty.topChoiceCopy;
  const rating = view?.rating ?? hdpProperty.rating;
  const visitsToday = view?.visitsToday ?? hdpProperty.visitsToday;
  const reviewCount = view?.reviewCount ?? hdpProperty.reviewCount;

  return (
    <section
      className={cn(
        "flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:p-6",
        className,
      )}
      aria-label="Property rating summary"
    >
      <div className="min-w-0 space-y-3">
        {trendingLabel ? (
          <span className="inline-flex rounded-full bg-hello-lime-50 px-2 py-0.5 text-xs font-semibold text-hello-lime-800">
            {trendingLabel}
          </span>
        ) : null}
        <p className="text-sm text-gray-700 md:text-base">
          <span className="font-semibold text-gray-900">{displayName}</span>{" "}
          <span className="text-gray-600">{topChoiceCopy}</span>
        </p>
        <div className="flex flex-wrap items-center gap-6">
          <Stat value={rating.toFixed(1)} label="Rating" />
          {visitsToday != null ? (
            <>
              <div className="hidden h-10 w-px bg-gray-200 sm:block" aria-hidden />
              <Stat value={visitsToday} label="Visits today" />
            </>
          ) : null}
          <div className="hidden h-10 w-px bg-gray-200 sm:block" aria-hidden />
          <Stat value={reviewCount} label="Reviews" />
        </div>
      </div>

      <Image
        src={hdpProperty.trophySrc}
        alt=""
        width={72}
        height={72}
        className="hidden size-[4.5rem] shrink-0 object-contain sm:block"
      />
    </section>
  );
}
