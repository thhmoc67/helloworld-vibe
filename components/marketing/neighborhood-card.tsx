"use client";

import Image from "next/image";
import Link from "next/link";
import type { RefObject } from "react";
import { cn } from "@/src/lib/cn";
import { useAnimateOnView } from "@/src/lib/use-animate-on-view";
import type { NeighborhoodCardData } from "@/src/tokens/neighborhood-card";

const CARD_ANIMATION_MS = 700;
const STAGGER_MS = 100;
const CARD_DELAY_OFFSET_MS = 80;
export const NEIGHBORHOOD_CARD_WIDTH_PX = 220;
const CARD_WIDTH_PX = NEIGHBORHOOD_CARD_WIDTH_PX;
const CARD_GAP_CLASS = "gap-4";
const TIMELINE_ROW_PADDING_X = "0.25rem";
const TIMELINE_DOT_OFFSET_PX = CARD_WIDTH_PX / 2;
const TIMELINE_ROW_HEIGHT_PX = 24;
const TIMELINE_LINE_TOP_PX = TIMELINE_ROW_HEIGHT_PX / 2;

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
        "flex w-[220px] shrink-0 flex-col rounded-2xl border border-blue-light-200 bg-white p-4",
        "transition-[transform,box-shadow] duration-300 ease-out",
        "hover:-translate-y-1 hover:shadow-md",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      <div className="flex items-center gap-1.5">
        <span aria-hidden className="text-base leading-none">
          {emoji}
        </span>
        <h3 className="text-sm font-bold text-blue-light-700">{category}</h3>
      </div>

      <div className="relative mt-3 aspect-[5/4] overflow-hidden rounded-xl bg-blue-light-50">
        <Image
          src={imageSrc}
          alt={imageAlt ?? placeName}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
        />
      </div>

      <p className="mt-3 text-sm font-bold text-gray-900">{placeName}</p>
      <p className="mt-1 text-sm font-medium text-blue-light-500">{walkTime}</p>

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

function TimelineDot({
  isActive,
  shouldAnimate,
  delay,
}: {
  isActive: boolean;
  shouldAnimate: boolean;
  delay: number;
}) {
  return (
    <div
      className={cn(
        "relative mb-3 flex h-6 w-full items-center justify-center",
        "transition-opacity ease-out motion-reduce:transition-none",
        !shouldAnimate || isActive ? "opacity-100" : "opacity-0",
      )}
      style={{
        transitionDuration: `${CARD_ANIMATION_MS}ms`,
        transitionDelay:
          shouldAnimate && isActive ? `${delay}ms` : "0ms",
      }}
    >
      <span
        aria-hidden
        className={cn(
          "relative z-10 size-3 rounded-full bg-blue-light-500 ring-4 ring-white",
          "transition-[opacity,transform] ease-out motion-reduce:transition-none",
          !shouldAnimate || isActive ? "scale-100 opacity-100" : "scale-0 opacity-0",
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
  scrollContainerRef?: RefObject<HTMLDivElement | null>;
}

export function NeighborhoodTimeline({
  items,
  className,
  showTimeline = true,
  animate = true,
  isActive: isActiveProp,
  shouldAnimate: shouldAnimateProp,
  scrollContainerRef,
}: NeighborhoodTimelineProps) {
  const { ref, isActive: internalActive, shouldAnimate: internalAnimate } =
    useAnimateOnView(animate);
  const isActive = isActiveProp ?? internalActive;
  const shouldAnimate = shouldAnimateProp ?? internalAnimate;
  const useInternalRef = isActiveProp === undefined;

  return (
    <div ref={useInternalRef ? ref : undefined} className={cn("min-w-0", className)}>
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto scroll-smooth scrollbar-none snap-x snap-mandatory"
      >
        <div
          className={cn(
            "relative flex w-max min-w-full px-1 pb-2",
            CARD_GAP_CLASS,
          )}
        >
          {showTimeline && items.length > 1 ? (
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute z-0 h-0.5 bg-blue-light-800",
                "origin-left transition-transform ease-out motion-reduce:transition-none",
                !shouldAnimate || isActive ? "scale-x-100" : "scale-x-0",
              )}
              style={{
                top: TIMELINE_LINE_TOP_PX,
                left: `calc(${TIMELINE_ROW_PADDING_X} + ${TIMELINE_DOT_OFFSET_PX}px)`,
                right: `calc(${TIMELINE_ROW_PADDING_X} + ${TIMELINE_DOT_OFFSET_PX}px)`,
                transitionDuration: `${CARD_ANIMATION_MS}ms`,
                transitionDelay:
                  shouldAnimate && isActive ? `${STAGGER_MS}ms` : "0ms",
              }}
            />
          ) : null}

          {items.map((item, index) => {
            const delay = index * STAGGER_MS + CARD_DELAY_OFFSET_MS;

            return (
              <div
                key={item.id}
                className="flex w-[220px] shrink-0 snap-start flex-col items-center"
              >
                {showTimeline ? (
                  <TimelineDot
                    isActive={isActive}
                    shouldAnimate={shouldAnimate}
                    delay={index * STAGGER_MS}
                  />
                ) : null}

                <div
                  className={cn(
                    "w-full transition-[opacity,transform] ease-out motion-reduce:transition-none",
                    !shouldAnimate || isActive
                      ? "translate-y-0 opacity-100"
                      : "translate-y-6 opacity-0",
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
