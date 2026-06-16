"use client";

import { useRef, useState } from "react";
import { SrpCard } from "@/components/marketing/srp-card";
import { LocalityPaginationDots } from "@/components/marketing/locality-card";
import { HomepageCarouselNav } from "@/components/marketing/homepage-carousel-nav";
import { HomepageSectionHeading } from "@/components/marketing/homepage-section-heading";
import { homepageFeaturedProperties, type HomepageFeaturedProperty } from "@/src/tokens/homepage";
import { cn } from "@/src/lib/cn";

function PropertyCard({
  property,
  className,
}: {
  property: HomepageFeaturedProperty;
  className?: string;
}) {
  return (
    <SrpCard
      name={property.name}
      subtitle={property.subtitle}
      images={property.images}
      rating={property.rating}
      roomTypes={property.roomTypes}
      rent={property.rent}
      originalRent={property.originalRent}
      offerLabel={property.offerLabel}
      statusLabel={property.statusLabel}
      visitsToday={property.visitsToday}
      genderLabel={property.genderLabel}
      className={className}
    />
  );
}

export function HomepageProperties() {
  const [mobileIndex, setMobileIndex] = useState(0);
  const [desktopIndex, setDesktopIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const count = homepageFeaturedProperties.length;
  const visibleDesktopCount = 3;

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

  const desktopItems = homepageFeaturedProperties.slice(
    desktopIndex,
    desktopIndex + visibleDesktopCount,
  );

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex justify-center">
          <HomepageSectionHeading
            prefix="This could be your"
            highlight="Home!"
            gradient="home"
          />
        </div>

        <div className="mt-8 hidden items-start justify-center gap-6 lg:flex">
          {desktopItems.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              className="w-[25.6875rem] shrink-0"
            />
          ))}
        </div>

        <HomepageCarouselNav
          className="mt-8 hidden lg:flex"
          prevDisabled={desktopIndex === 0}
          nextDisabled={desktopIndex >= count - visibleDesktopCount}
          onPrev={() => setDesktopIndex((index) => Math.max(0, index - 1))}
          onNext={() =>
            setDesktopIndex((index) =>
              Math.min(count - visibleDesktopCount, index + 1),
            )
          }
        />

        <div className="mt-8 lg:hidden">
          <div
            ref={scrollRef}
            onScroll={handleMobileScroll}
            className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-none"
          >
            {homepageFeaturedProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                className={cn("w-[min(100%,25.6875rem)] shrink-0 snap-center")}
              />
            ))}
          </div>
          <div className="mt-6">
            <LocalityPaginationDots
              count={count}
              activeIndex={mobileIndex}
              onSelect={goToMobileIndex}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
