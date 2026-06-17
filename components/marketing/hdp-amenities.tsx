import { hdpAmenities } from "@/src/tokens/hdp";
import { cn } from "@/src/lib/cn";

function humanizeAmenity(value: string): string {
  return value
    .replace(/[_-]+/g, " ")
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function HdpAmenities({
  amenities,
  className,
}: {
  amenities?: readonly string[];
  className?: string;
}) {
  const source =
    amenities && amenities.length > 0
      ? amenities.map((label, index) => ({
          id: `${label}-${index}`,
          label: label.includes(" ") ? label : humanizeAmenity(label),
        }))
      : hdpAmenities.map((label, index) => ({
          id: `demo-${index}`,
          label,
        }));
  const visible = source.slice(0, 11);
  const hasMore = source.length > visible.length;

  return (
    <section
      id="hdp-amenities"
      className={cn("scroll-mt-32 space-y-6", className)}
      aria-label="Amenities section"
    >
      <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">Amenities</h2>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 md:grid-cols-4">
        {visible.map((item) => (
          <li key={item.id} className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-gray-100 text-lg">
              ✓
            </span>
            <span className="text-sm font-medium text-gray-800">{item.label}</span>
          </li>
        ))}
      </ul>
      {hasMore ? (
        <p className="text-sm font-medium text-gray-500">
          +{source.length - visible.length} more amenities
        </p>
      ) : null}
    </section>
  );
}
