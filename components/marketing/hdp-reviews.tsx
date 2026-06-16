"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HomepageCarouselNav } from "@/components/marketing/homepage-carousel-nav";
import {
  hdpResidentReviews,
  hdpReviewSummary,
  type HdpResidentReview,
} from "@/src/tokens/hdp-reviews";
import { cn } from "@/src/lib/cn";

const CARD_WIDTH = 301;
const CARD_GAP = 24;

function RecommendRing({ percent }: { percent: number }) {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative size-14 shrink-0">
      <svg viewBox="0 0 56 56" className="size-full -rotate-90">
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="4"
        />
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="#7FC723"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-hello-lime-700">
        {percent}%
      </span>
    </div>
  );
}

function CategoryBar({
  label,
  score,
}: {
  label: string;
  score: number;
}) {
  const widthPercent = Math.min(100, (score / 5) * 100);

  return (
    <div className="flex items-center gap-4">
      <span className="w-[4.625rem] shrink-0 text-sm font-medium text-gray-800">
        {label}
      </span>
      <div className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-gray-300">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#7FC723] to-[#3E6111]"
          style={{ width: `${widthPercent}%` }}
        />
      </div>
      <span className="w-8 shrink-0 text-right text-sm font-medium text-gray-800">
        {score.toFixed(1)}
      </span>
    </div>
  );
}

function ReviewCard({ review }: { review: HdpResidentReview }) {
  return (
    <article className="flex h-[16.375rem] w-[18.8125rem] shrink-0 snap-start flex-col gap-4 rounded-[10px] border border-[#eee] bg-white p-4 shadow-[0_1px_5.5px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-3">
        <div className="relative size-9 shrink-0 overflow-hidden rounded-full bg-gray-100">
          <Image
            src={review.avatarSrc}
            alt=""
            fill
            className="object-cover"
            sizes="36px"
          />
        </div>
        <div className="flex min-w-0 flex-1 items-start justify-between gap-2">
          <p className="truncate text-base font-bold text-gray-900">
            {review.name}
          </p>
          <span className="shrink-0 rounded-2xl bg-blue-light-50 px-2 py-0.5 text-xs font-medium text-blue-light-600">
            {review.rating}★
          </span>
        </div>
      </div>
      <p className="line-clamp-6 text-sm leading-5 text-[#343434]">
        {review.quote}
      </p>
    </article>
  );
}

export function HdpReviews({ className }: { className?: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  function updateScrollState() {
    const container = scrollRef.current;
    if (!container) return;

    const maxScroll = container.scrollWidth - container.clientWidth;
    setCanScrollPrev(container.scrollLeft > 8);
    setCanScrollNext(container.scrollLeft < maxScroll - 8);
  }

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, []);

  function scrollByCards(direction: "prev" | "next") {
    const container = scrollRef.current;
    if (!container) return;

    const delta = (CARD_WIDTH + CARD_GAP) * (direction === "next" ? 1 : -1);
    container.scrollBy({ left: delta, behavior: "smooth" });
  }

  return (
    <section
      className={cn("space-y-8", className)}
      aria-label="What residents say"
    >
      <h2 className="text-2xl font-medium text-black md:text-[1.875rem] md:leading-[2.375rem]">
        What Residents Say
      </h2>

      <div className="space-y-4">
        <div
          className={cn(
            "rounded-2xl border border-gray-300/60 p-4 md:p-[1.0625rem]",
            "bg-[linear-gradient(131deg,rgba(255,255,255,0.56)_45.09%,rgba(213,236,249,0.56)_94.76%),linear-gradient(90deg,#fff_0%,#fff_100%)]",
          )}
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:justify-between">
            <div className="space-y-4 lg:max-w-[18.3125rem]">
              <div className="space-y-0.5">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[1.875rem] font-medium leading-[2.375rem] text-gray-800">
                    {hdpReviewSummary.rating}
                    <span className="text-amber-400">★</span>
                  </p>
                  <p className="text-base font-bold text-gray-900">
                    {hdpReviewSummary.label}
                  </p>
                </div>
                <p className="text-xs font-medium text-gray-500">
                  Based on {hdpReviewSummary.reviewCount} verified reviews
                </p>
              </div>

              <div className="h-px bg-gray-300" />

              <div className="flex items-center gap-4">
                <RecommendRing percent={hdpReviewSummary.recommendPercent} />
                <p className="max-w-[9.375rem] text-sm font-medium leading-5 text-gray-800">
                  Residents would recommend to a friend
                </p>
              </div>
            </div>

            <div className="hidden w-px shrink-0 bg-gray-300 lg:block" />

            <div className="flex min-w-0 flex-1 flex-col justify-center gap-4 lg:max-w-[18.875rem]">
              {hdpReviewSummary.categories.map((category) => (
                <CategoryBar
                  key={category.label}
                  label={category.label}
                  score={category.score}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div
            ref={scrollRef}
            onScroll={updateScrollState}
            className="-mx-1 flex gap-6 overflow-x-auto px-1 pb-1 scrollbar-none snap-x snap-mandatory"
          >
            {hdpResidentReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          <HomepageCarouselNav
            onPrev={() => scrollByCards("prev")}
            onNext={() => scrollByCards("next")}
            prevDisabled={!canScrollPrev}
            nextDisabled={!canScrollNext}
          />
        </div>
      </div>
    </section>
  );
}
