import { NeighborhoodTimeline } from "@/components/marketing/neighborhood-card";
import type { NeighborhoodCardData } from "@/src/tokens/neighborhood-card";

function MapLinkButton() {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 text-sm font-semibold text-hello-lime-600 hover:text-hello-lime-700"
    >
      <svg aria-hidden viewBox="0 0 16 16" fill="none" className="size-4">
        <path
          d="M8 1.5a4 4 0 0 0-4 4c0 3 4 8.5 4 8.5s4-5.5 4-8.5a4 4 0 0 0-4-4Z"
          stroke="currentColor"
          strokeWidth="1.33"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="8" cy="5.5" r="1.25" fill="currentColor" />
      </svg>
      Show on Maps
    </button>
  );
}

export function LocalityDayFromHereSection({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: readonly NeighborhoodCardData[];
}) {
  return (
    <section aria-label="A day from here">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 md:text-[1.875rem] md:leading-[2.375rem]">
            {title}
          </h2>
          <p className="text-base text-gray-600">{subtitle}</p>
        </div>
        <MapLinkButton />
      </div>
      <div className="mt-6">
        <NeighborhoodTimeline items={items} />
      </div>
    </section>
  );
}
