"use client";

import { useRef, useState } from "react";
import {
  LocalityCard,
  LocalityCarouselButton,
  LocalityPaginationDots,
} from "@/components/marketing/locality-card";
import {
  localityCardSamples,
  localitySectionTitle,
} from "@/src/tokens/locality-card";

function DemoLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
      {children}
    </p>
  );
}

export function LocalityCardDemo() {
  const [desktopIndex, setDesktopIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const desktopLocality = localityCardSamples[desktopIndex];
  const desktopCount = localityCardSamples.length;

  function goToMobileIndex(index: number) {
    setMobileIndex(index);
    const container = scrollRef.current;
    const card = container?.children[index] as HTMLElement | undefined;
    card?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
  }

  function handleMobileScroll() {
    const container = scrollRef.current;
    if (!container) return;

    const cards = Array.from(container.children) as HTMLElement[];
    const scrollLeft = container.scrollLeft;
    const nextIndex = cards.findIndex((card, index) => {
      const nextCard = cards[index + 1];
      if (!nextCard) return index === cards.length - 1;
      return scrollLeft < nextCard.offsetLeft - container.offsetLeft - 24;
    });

    setMobileIndex(nextIndex === -1 ? 0 : nextIndex);
  }

  return (
    <div className="grid gap-16 xl:grid-cols-1 xl:items-start">
      <div>
        <DemoLabel>Desktop</DemoLabel>
        <div className="flex flex-col items-center gap-6">
          <LocalityCard
            layout="desktop"
            name={desktopLocality.name}
            startingRent={desktopLocality.startingRent}
            propertyCount={desktopLocality.propertyCount}
            imageSrc={desktopLocality.imageSrc}
          />
          <div className="flex items-center gap-4">
            <LocalityCarouselButton
              direction="prev"
              label="Previous locality"
              disabled={desktopIndex === 0}
              onClick={() => setDesktopIndex((index) => Math.max(0, index - 1))}
            />
            <LocalityCarouselButton
              direction="next"
              label="Next locality"
              disabled={desktopIndex === desktopCount - 1}
              onClick={() =>
                setDesktopIndex((index) => Math.min(desktopCount - 1, index + 1))
              }
            />
          </div>
        </div>
      </div>

      <div>
        <DemoLabel>Mobile</DemoLabel>
        <div className="mx-auto max-w-[320px]">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900">
            {localitySectionTitle}
          </h3>
          <div
            ref={scrollRef}
            onScroll={handleMobileScroll}
            className="mt-6 flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-none"
          >
            {localityCardSamples.map((locality) => (
              <LocalityCard
                key={locality.id}
                layout="mobile"
                showArrow
                name={locality.name}
                startingRent={locality.startingRent}
                propertyCount={locality.propertyCount}
                imageSrc={locality.imageSrc}
              />
            ))}
          </div>
          <div className="mt-6">
            <LocalityPaginationDots
              count={localityCardSamples.length}
              activeIndex={mobileIndex}
              onSelect={goToMobileIndex}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
