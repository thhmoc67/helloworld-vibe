"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/src/lib/cn";

export function PropertyGalleryFromImages({
  images,
  alt,
  className,
}: {
  images: readonly string[];
  alt: string;
  className?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const slideCount = images.length;

  if (slideCount === 0) return null;

  function goTo(direction: -1 | 1) {
    setActiveIndex((current) => (current + direction + slideCount) % slideCount);
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="relative hidden aspect-[16/9] overflow-hidden rounded-3xl bg-gray-200 md:block">
        <Image
          src={images[activeIndex]}
          alt={`${alt} — photo ${activeIndex + 1} of ${slideCount}`}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1280px) 100vw, 1280px"
        />
        {slideCount > 1 ? (
          <>
            <button
              type="button"
              aria-label="Previous photo"
              onClick={() => goTo(-1)}
              className="absolute left-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={() => goTo(1)}
              className="absolute right-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white"
            >
              ›
            </button>
          </>
        ) : null}
      </div>

      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gray-200 md:hidden">
        <Image
          src={images[activeIndex]}
          alt={`${alt} — photo ${activeIndex + 1} of ${slideCount}`}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {slideCount > 1 ? (
          <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                aria-label={`Go to photo ${index + 1}`}
                aria-current={index === activeIndex}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "size-2 rounded-full bg-white/80",
                  index === activeIndex && "w-5",
                )}
              />
            ))}
          </div>
        ) : null}
      </div>

      {slideCount > 1 ? (
        <div className="hidden gap-3 overflow-x-auto md:flex">
          {images.slice(0, 6).map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2",
                index === activeIndex ? "border-hello-lime-400" : "border-transparent",
              )}
            >
              <Image src={image} alt="" fill className="object-cover" sizes="112px" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
