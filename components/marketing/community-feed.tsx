"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { CommunityFeedHeading } from "@/components/marketing/community-headings";
import { HomepageCarouselNav } from "@/components/marketing/homepage-carousel-nav";
import { LocalityPaginationDots } from "@/components/marketing/locality-card";
import { cn } from "@/src/lib/cn";
import {
  communityFeedItems,
  communityInstagramUrl,
} from "@/src/tokens/community";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" fill="none" className={className}>
      <rect
        x="1.5"
        y="1.5"
        width="13"
        height="13"
        rx="3.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="11.75" cy="4.25" r="0.75" fill="currentColor" />
    </svg>
  );
}

function FollowButton({ className }: { className?: string }) {
  return (
    <Link
      href={communityInstagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex h-9 shrink-0 items-center gap-1 rounded-lg bg-gray-800 px-3.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-gray-900",
        className,
      )}
    >
      Follow
      <InstagramIcon className="size-4" />
    </Link>
  );
}

export function CommunityFeed() {
  const [desktopIndex, setDesktopIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const count = communityFeedItems.length;
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

  const desktopItems = communityFeedItems.slice(
    desktopIndex,
    desktopIndex + visibleCount,
  );

  return (
    <section className="bg-white pb-12 sm:pb-16 lg:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
          <CommunityFeedHeading />
          <FollowButton />
        </div>

        <div className="mt-8 hidden gap-6 lg:flex">
          {desktopItems.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="w-[18.875rem] shrink-0 overflow-hidden rounded-2xl shadow-[0_8px_10px_-6px_rgba(0,0,0,0.1),0_20px_25px_-5px_rgba(0,0,0,0.1)]"
            >
              <Image
                src={src}
                alt="HelloWorld community moment"
                width={302}
                height={437}
                className="aspect-[302/437] w-full object-cover"
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
            {communityFeedItems.map((src, index) => (
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
