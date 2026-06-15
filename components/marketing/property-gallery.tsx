"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/src/lib/cn";
import {
  galleryCategoryTabs,
  propertyGalleryDesktop,
  propertyGalleryItems,
  propertyGalleryTotal,
  type GalleryCategory,
  type GalleryMediaItem,
} from "@/src/tokens/property-gallery";

function GalleryBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute left-3 top-3 z-10 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
      {children}
    </span>
  );
}

function GalleryChevron({
  direction,
  label,
  onClick,
  disabled,
  variant = "dark",
}: {
  direction: "prev" | "next";
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "dark" | "light";
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "absolute top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full transition-opacity disabled:cursor-not-allowed disabled:opacity-30",
        direction === "prev" ? "left-3" : "right-3",
        variant === "dark"
          ? "text-white hover:bg-white/10"
          : "border border-gray-300 bg-white text-gray-900 shadow-xs hover:bg-gray-50",
      )}
    >
      <svg aria-hidden viewBox="0 0 24 24" fill="none" className="size-5">
        <path
          d={direction === "prev" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function GalleryImageTile({
  item,
  className,
  showViewAll,
  onViewAll,
}: {
  item: GalleryMediaItem;
  className?: string;
  showViewAll?: boolean;
  onViewAll?: () => void;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl bg-gray-200", className)}>
      <Image
        src={item.imageSrc}
        alt={item.label}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 280px"
      />
      <GalleryBadge>{item.label}</GalleryBadge>
      {showViewAll ? (
        <button
          type="button"
          onClick={onViewAll}
          className="absolute bottom-3 right-3 z-10 rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm"
        >
          View All {propertyGalleryTotal}+
        </button>
      ) : null}
    </div>
  );
}

function GalleryVideoTile({
  item,
  className,
  onPrev,
  onNext,
}: {
  item: GalleryMediaItem;
  className?: string;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-black",
        className,
      )}
    >
      <Image
        src={item.imageSrc}
        alt=""
        fill
        className="object-cover opacity-40"
        sizes="(max-width: 768px) 100vw, 480px"
      />
      <div className="absolute inset-0 bg-black/55" aria-hidden />
      <GalleryBadge>{item.label}</GalleryBadge>
      <GalleryChevron direction="prev" label="Previous" onClick={onPrev} />
      <GalleryChevron direction="next" label="Next" onClick={onNext} />
    </div>
  );
}

export function PropertyGalleryDesktop({ className }: { className?: string }) {
  const { video, moments, livingRoom, washroom } = propertyGalleryDesktop;

  return (
    <div
      className={cn(
        "grid h-[min(360px,55vw)] min-h-[280px] grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] gap-3",
        className,
      )}
    >
      <GalleryVideoTile item={video} className="h-full" />
      <GalleryImageTile item={moments} className="h-full" />
      <div className="grid min-h-0 grid-rows-2 gap-3">
        <GalleryImageTile item={livingRoom} className="min-h-0" />
        <GalleryImageTile item={washroom} className="min-h-0" showViewAll />
      </div>
    </div>
  );
}

function GalleryPaginationDots({
  count,
  activeIndex,
}: {
  count: number;
  activeIndex: number;
}) {
  const visibleCount = Math.min(count, 6);

  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: visibleCount }, (_, index) => (
        <span
          key={index}
          aria-hidden
          className={cn(
            "h-1.5 rounded-full bg-white transition-all",
            index === activeIndex % visibleCount ? "w-8" : "w-1.5 opacity-50",
          )}
        />
      ))}
    </div>
  );
}

export function PropertyGalleryMobile({ className }: { className?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = propertyGalleryItems[activeIndex];
  const activeCategory = activeItem.category;

  function goToCategory(category: GalleryCategory) {
    const index = propertyGalleryItems.findIndex(
      (item) => item.category === category,
    );
    if (index >= 0) setActiveIndex(index);
  }

  function goPrev() {
    setActiveIndex((index) =>
      index === 0 ? propertyGalleryItems.length - 1 : index - 1,
    );
  }

  function goNext() {
    setActiveIndex((index) =>
      index === propertyGalleryItems.length - 1 ? 0 : index + 1,
    );
  }

  return (
    <div className={cn("mx-auto w-full max-w-[320px]", className)}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-black">
        {activeItem.kind === "video" ? (
          <>
            <Image
              src={activeItem.imageSrc}
              alt=""
              fill
              className="object-cover opacity-35"
              sizes="320px"
            />
            <div className="absolute inset-0 bg-black/55" aria-hidden />
          </>
        ) : (
          <Image
            src={activeItem.imageSrc}
            alt={activeItem.label}
            fill
            className="object-cover"
            sizes="320px"
          />
        )}

        <GalleryChevron direction="prev" label="Previous" onClick={goPrev} />
        <GalleryChevron direction="next" label="Next" onClick={goNext} />

        <div className="absolute bottom-24 right-3 z-10 rounded-lg bg-white px-2.5 py-1 text-sm font-semibold text-gray-900">
          {activeIndex + 1}/{propertyGalleryTotal}
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-4 pb-5 pt-16">
          <div className="flex flex-wrap justify-center gap-2">
            {galleryCategoryTabs.map((tab) => {
              const isActive = tab.value === activeCategory;
              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => goToCategory(tab.value)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    isActive
                      ? "bg-white text-gray-900"
                      : "bg-white/25 text-white backdrop-blur-sm",
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
          <div className="mt-4">
            <GalleryPaginationDots
              count={propertyGalleryItems.length}
              activeIndex={activeIndex}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
