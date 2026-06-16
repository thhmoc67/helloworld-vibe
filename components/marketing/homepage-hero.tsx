"use client";

import Image from "next/image";
import { useState } from "react";
import { LocationSearch } from "@/components/search/location-search";
import { cn } from "@/src/lib/cn";
import {
  homepageHeroDesktop,
  homepageHeroMobile,
  homepageVibeChips,
  homepageVibeMoreCount,
} from "@/src/tokens/homepage";

const heroImageBlendOverlayClass =
  "pointer-events-none absolute inset-y-0 left-0 w-[55%] bg-[linear-gradient(to_right,#ffffff_0%,color-mix(in_srgb,#ffffff_96%,transparent)_30%,color-mix(in_srgb,#ffffff_70%,transparent)_48%,color-mix(in_srgb,#ffffff_30%,transparent)_66%,transparent_84%)]";

function VibeCheckIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <circle cx="8" cy="8" r="7" fill="currentColor" />
      <path
        d="M5 8l2 2 4-4"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HomepageHeroHeading({
  className,
  size = "desktop",
}: {
  className?: string;
  size?: "desktop" | "mobile";
}) {
  return (
    <h1
      className={cn(
        "font-bold tracking-tight text-gray-900",
        size === "desktop"
          ? "max-w-xl text-display-md sm:text-display-lg lg:text-[3.75rem] lg:leading-[4.5rem]"
          : "max-w-[19rem] text-[1.625rem] leading-[1.875rem]",
        className,
      )}
    >
      <span className="block">Coliving that</span>
      <span className="block">
        Matches Your{" "}
        <span className="font-satoshi font-bold italic text-gradient-vibe">
          Vibe!
        </span>
      </span>
    </h1>
  );
}

function VibeFilters({
  selectedVibes,
  onToggle,
}: {
  selectedVibes: Set<string>;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="mt-5">
      <p className="text-sm text-gray-600">
        <span aria-hidden className="mr-1">
          ✨
        </span>
        Add your vibe for better matches{" "}
        <span className="text-xs italic text-gray-400">(optional)</span>
      </p>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-none lg:flex-wrap lg:overflow-visible">
        {homepageVibeChips.map((chip) => {
          const selected = selectedVibes.has(chip.id);

          return (
            <button
              key={chip.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onToggle(chip.id)}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition-colors",
                selected
                  ? "border-[#28b2b0] bg-white text-gray-900"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-300",
              )}
            >
              <span aria-hidden>{chip.emoji}</span>
              {chip.label}
              {selected ? (
                <VibeCheckIcon className="size-4 text-hello-lime-500" />
              ) : null}
            </button>
          );
        })}
        <button
          type="button"
          className="inline-flex shrink-0 items-center rounded-full bg-hello-lime-100 px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-hello-lime-200"
        >
          +{homepageVibeMoreCount} More
        </button>
      </div>
    </div>
  );
}

export function HomepageHero() {
  const [selectedVibes, setSelectedVibes] = useState<Set<string>>(
    () => new Set(homepageVibeChips.map((chip) => chip.id)),
  );

  function toggleVibe(id: string) {
    setSelectedVibes((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <section className="relative bg-white">
      {/* Mobile */}
      <div className="lg:hidden">
        <div className="relative h-[17.25rem] w-full overflow-hidden bg-white">
          <Image
            src={homepageHeroMobile.file}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.82)_0%,rgba(255,255,255,0.35)_40%,transparent_72%)]"
          />
          <div className="absolute inset-x-4 top-2">
            <HomepageHeroHeading size="mobile" />
          </div>
        </div>

        <div className="relative z-20 bg-white px-4 pb-8 pt-5 sm:px-6">
          <LocationSearch localityPlaceholder="Search Here" />
          <VibeFilters selectedVibes={selectedVibes} onToggle={toggleVibe} />
        </div>
      </div>

      {/* Desktop */}
      <div className="relative hidden bg-white lg:block lg:min-h-[28.875rem]">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[58%]">
          <Image
            src={homepageHeroDesktop.file}
            alt={homepageHeroDesktop.name}
            fill
            priority
            sizes="58vw"
            className="object-contain object-right-bottom"
          />
          <div aria-hidden className={heroImageBlendOverlayClass} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-[36rem] pb-10 pt-10 xl:pb-12 xl:pt-12">
            <HomepageHeroHeading />

            <div className="relative z-20 mt-8">
              <LocationSearch localityPlaceholder="Search for Localities" />
            </div>

            <VibeFilters selectedVibes={selectedVibes} onToggle={toggleVibe} />
          </div>
        </div>
      </div>
    </section>
  );
}
