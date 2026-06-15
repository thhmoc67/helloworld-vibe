"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/src/lib/cn";
import { useAnimateOnView } from "@/src/lib/use-animate-on-view";
import type { NeighborhoodCardData } from "@/src/tokens/neighborhood-card";

const CARD_ANIMATION_MS = 700;
const STAGGER_MS = 100;
const CARD_DELAY_OFFSET_MS = 80;

export interface NeighborhoodCardProps extends NeighborhoodCardData {
  className?: string;
  onLinkClick?: () => void;
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" fill="none" className={className}>
      <path
        d="M6 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function NeighborhoodCard({
  emoji,
  category,
  placeName,
  imageSrc,
  imageAlt,
  walkTime,
  linkLabel,
  href,
  onLinkClick,
  className,
}: NeighborhoodCardProps) {
  const linkContent = (
    <>
      {linkLabel}
      <ChevronRightIcon className="size-4 transition-transform duration-200 group-hover/link:translate-x-0.5 motion-reduce:transition-none" />
    </>
  );

  const linkClassName =
    "group/link mt-3 inline-flex items-center gap-0.5 text-sm font-semibold text-hello-lime-600 transition-colors hover:text-hello-lime-700";

  return (
    <article
      className={cn(
        "flex w-[220px] shrink-0 flex-col rounded-2xl border border-blue-light-200 bg-blue-light-25 p-4",
        "transition-[transform,box-shadow] duration-300 ease-out",
        "hover:-translate-y-1 hover:shadow-md",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      <div className="flex items-center gap-1.5">
        <span aria-hidden className="text-base">
          {emoji}
        </span>
        <h3 className="text-sm font-bold text-blue-light-900">{category}</h3>
      </div>

      <div className="relative mt-3 aspect-4/3 overflow-hidden rounded-xl bg-blue-light-100">
        <Image
          src={imageSrc}
          alt={imageAlt ?? placeName}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
        />
      </div>

      <p className="mt-3 text-sm font-bold text-gray-900">{placeName}</p>
      <p className="mt-1 text-xs font-medium text-blue-light-600">{walkTime}</p>

      {href ? (
        <Link href={href} className={linkClassName}>
          {linkContent}
        </Link>
      ) : (
        <button type="button" onClick={onLinkClick} className={linkClassName}>
          {linkContent}
        </button>
      )}
    </article>
  );
}

function TimelineMarker({
  index,
  total,
  isActive,
  shouldAnimate,
}: {
  index: number;
  total: number;
  isActive: boolean;
  shouldAnimate: boolean;
}) {
  const delay = index * STAGGER_MS;

  return (
    <div
      className={cn(
        "relative mb-3 flex h-6 w-full items-center justify-center",
        "transition-opacity ease-out motion-reduce:transition-none",
        shouldAnimate && (isActive ? "opacity-100" : "opacity-0"),
      )}
      style={{
        transitionDuration: `${CARD_ANIMATION_MS}ms`,
        transitionDelay:
          shouldAnimate && isActive ? `${delay}ms` : "0ms",
      }}
    >
      {index > 0 ? (
        <span
          aria-hidden
          className={cn(
            "absolute right-1/2 top-1/2 h-0.5 w-1/2 origin-right -translate-y-1/2 bg-blue-light-800",
            "transition-transform ease-out motion-reduce:transition-none",
            shouldAnimate && (isActive ? "scale-x-100" : "scale-x-0"),
          )}
          style={{
            transitionDuration: `${CARD_ANIMATION_MS}ms`,
            transitionDelay:
              shouldAnimate && isActive ? `${delay}ms` : "0ms",
          }}
        />
      ) : null}
      {index < total - 1 ? (
        <span
          aria-hidden
          className={cn(
            "absolute left-1/2 top-1/2 h-0.5 w-1/2 origin-left -translate-y-1/2 bg-blue-light-800",
            "transition-transform ease-out motion-reduce:transition-none",
            shouldAnimate && (isActive ? "scale-x-100" : "scale-x-0"),
          )}
          style={{
            transitionDuration: `${CARD_ANIMATION_MS}ms`,
            transitionDelay:
              shouldAnimate && isActive ? `${delay}ms` : "0ms",
          }}
        />
      ) : null}
      <span
        aria-hidden
        className={cn(
          "relative z-10 size-3 rounded-full bg-blue-light-500 ring-4 ring-white",
          "transition-[opacity,transform] ease-out motion-reduce:transition-none",
          shouldAnimate && (isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"),
        )}
        style={{
          transitionDuration: `${CARD_ANIMATION_MS}ms`,
          transitionDelay:
            shouldAnimate && isActive ? `${delay + 40}ms` : "0ms",
        }}
      />
    </div>
  );
}

export interface NeighborhoodTimelineProps {
  items: readonly NeighborhoodCardData[];
  className?: string;
  showTimeline?: boolean;
  animate?: boolean;
  isActive?: boolean;
  shouldAnimate?: boolean;
}

export function NeighborhoodTimeline({
  items,
  className,
  showTimeline = true,
  animate = true,
  isActive: isActiveProp,
  shouldAnimate: shouldAnimateProp,
}: NeighborhoodTimelineProps) {
  const { ref, isActive: internalActive, shouldAnimate: internalAnimate } =
    useAnimateOnView(animate);
  const isActive = isActiveProp ?? internalActive;
  const shouldAnimate = shouldAnimateProp ?? internalAnimate;
  const useInternalRef = isActiveProp === undefined;

  return (
    <div ref={useInternalRef ? ref : undefined} className={cn("min-w-0", className)}>
      <div className="overflow-x-auto scrollbar-none">
        <div className="flex w-max min-w-full gap-4 px-1 pb-2">
          {items.map((item, index) => {
            const delay = index * STAGGER_MS + CARD_DELAY_OFFSET_MS;

            return (
              <div
                key={item.id}
                className="flex w-[220px] shrink-0 flex-col items-center"
              >
                {showTimeline ? (
                  <TimelineMarker
                    index={index}
                    total={items.length}
                    isActive={isActive}
                    shouldAnimate={shouldAnimate}
                  />
                ) : null}

                <div
                  className={cn(
                    "w-full transition-[opacity,transform] ease-out motion-reduce:transition-none",
                    shouldAnimate &&
                      (isActive
                        ? "translate-y-0 opacity-100"
                        : "translate-y-6 opacity-0"),
                  )}
                  style={{
                    transitionDuration: `${CARD_ANIMATION_MS}ms`,
                    transitionDelay:
                      shouldAnimate && isActive ? `${delay}ms` : "0ms",
                  }}
                >
                  <NeighborhoodCard {...item} className="group w-full" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
