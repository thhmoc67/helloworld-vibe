"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { HomepageCarouselNav } from "@/components/marketing/homepage-carousel-nav";
import {
  LocalityPaginationDots,
} from "@/components/marketing/locality-card";
import { HomepageSectionHeading } from "@/components/marketing/homepage-section-heading";
import { homepageFeedItems } from "@/src/tokens/homepage";

export function HomepageFeed() {
  const [desktopIndex, setDesktopIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const count = homepageFeedItems.length;
  const visibleCount = 4;

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
      return scrollLeft < nextCard.offsetLeft - container.offsetLeft - 16;
    });

    setMobileIndex(nextIndex === -1 ? 0 : nextIndex);
  }

  const desktopItems = homepageFeedItems.slice(
    desktopIndex,
    desktopIndex + visibleCount,
  );

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex justify-center">
          <HomepageSectionHeading
            prefix="Straight from the"
            highlight="Feed!"
            gradient="home"
          />
        </div>

        <div className="mt-8 hidden gap-4 lg:grid lg:grid-cols-4">
          {desktopItems.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="overflow-hidden rounded-2xl bg-gray-100 shadow-md"
            >
              <Image
                src={src}
                alt="HelloWorld community moment"
                width={280}
                height={420}
                className="aspect-[3/4] w-full object-cover"
              />
            </div>
          ))}
        </div>

        <HomepageCarouselNav
          className="mt-8 hidden lg:flex"
          prevDisabled={desktopIndex === 0}
          nextDisabled={desktopIndex >= count - visibleCount}
          onPrev={() => setDesktopIndex((index) => Math.max(0, index - 1))}
          onNext={() =>
            setDesktopIndex((index) =>
              Math.min(count - visibleCount, index + 1),
            )
          }
        />

        <div className="mt-8 lg:hidden">
          <div
            ref={scrollRef}
            onScroll={handleMobileScroll}
            className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-none"
          >
            {homepageFeedItems.map((src, index) => (
              <div
                key={`${src}-${index}`}
                className="w-44 shrink-0 snap-center overflow-hidden rounded-2xl bg-gray-100 shadow-md sm:w-52"
              >
                <Image
                  src={src}
                  alt="HelloWorld community moment"
                  width={208}
                  height={312}
                  className="aspect-[3/4] w-full object-cover"
                />
              </div>
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
