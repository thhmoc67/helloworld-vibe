import { hdpAmenities } from "@/src/tokens/hdp";
import { cn } from "@/src/lib/cn";

export function HdpAmenities({ className }: { className?: string }) {
  const visible = hdpAmenities.slice(0, 11);
  const hasMore = hdpAmenities.length > visible.length;

  return (
    <section
      id="hdp-amenities"
      className={cn("scroll-mt-32 space-y-4", className)}
      aria-label="Amenities section"
    >
      <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
        Amenities Included
      </h2>
      <div className="flex flex-wrap gap-3">
        {visible.map((amenity) => (
          <span
            key={amenity}
            className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-800"
          >
            {amenity}
          </span>
        ))}
        {hasMore ? (
          <button
            type="button"
            className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-semibold text-gray-800 hover:bg-gray-50"
          >
            View All
          </button>
        ) : null}
      </div>
    </section>
  );
}
