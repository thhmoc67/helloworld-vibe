"use client";

import {
  useCallback,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/src/lib/cn";

export interface TabNavItem {
  id: string;
  label: string;
  heading?: string;
}

export interface TabNavProps<T extends string = string> {
  items: readonly TabNavItem[];
  value: T;
  onChange: (id: T) => void;
  heading?: string;
  className?: string;
  "aria-label"?: string;
}

type IndicatorStyle = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export function TabNav<T extends string>({
  items,
  value,
  onChange,
  heading,
  className,
  "aria-label": ariaLabel = "Property sections",
}: TabNavProps<T>) {
  const tabListId = useId();
  const listRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef(new Map<string, HTMLButtonElement>());
  const hasMountedRef = useRef(false);
  const [indicator, setIndicator] = useState<IndicatorStyle | null>(null);
  const activeItem = items.find((item) => item.id === value) ?? items[0];
  const sectionHeading = heading ?? activeItem?.heading ?? activeItem?.label ?? "";

  const updateIndicator = useCallback(() => {
    const list = listRef.current;
    const activeTab = tabRefs.current.get(value);

    if (!list || !activeTab) {
      return;
    }

    setIndicator({
      left: activeTab.offsetLeft,
      top: activeTab.offsetTop,
      width: activeTab.offsetWidth,
      height: activeTab.offsetHeight,
    });

    list.scrollTo({
      left: activeTab.offsetLeft,
      behavior: hasMountedRef.current ? "smooth" : "instant",
    });
    hasMountedRef.current = true;
  }, [value]);

  useLayoutEffect(() => {
    updateIndicator();
  }, [updateIndicator, items]);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) {
      return;
    }

    const observer = new ResizeObserver(() => {
      updateIndicator();
    });

    observer.observe(list);

    return () => observer.disconnect();
  }, [updateIndicator]);

  return (
    <div className={cn("w-full min-w-0", className)}>
      <div
        ref={listRef}
        role="tablist"
        aria-label={ariaLabel}
        aria-orientation="horizontal"
        className="relative flex gap-2 overflow-x-auto scroll-smooth border-y border-gray-200 bg-white py-3 scrollbar-none sm:gap-3"
      >
        {indicator ? (
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute rounded-full bg-hello-lime-50",
              "transition-[left,width,top,height] duration-300 ease-in-out",
              "motion-reduce:transition-none",
            )}
            style={{
              left: indicator.left,
              top: indicator.top,
              width: indicator.width,
              height: indicator.height,
            }}
          />
        ) : null}

        {items.map((item) => {
          const isActive = item.id === value;

          return (
            <button
              key={item.id}
              ref={(element) => {
                if (element) {
                  tabRefs.current.set(item.id, element);
                } else {
                  tabRefs.current.delete(item.id);
                }
              }}
              id={`${tabListId}-${item.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`${tabListId}-${item.id}-panel`}
              onClick={() => onChange(item.id as T)}
              className={cn(
                "relative z-10 shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300",
                "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-hello-lime-100",
                "motion-reduce:transition-none",
                isActive
                  ? "text-gray-900"
                  : "text-gray-900 hover:bg-gray-50",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {sectionHeading ? (
        <div
          role="tabpanel"
          id={`${tabListId}-${activeItem.id}-panel`}
          aria-labelledby={`${tabListId}-${activeItem.id}`}
          className="pt-6"
        >
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            <span className="bg-[linear-gradient(to_right,#08a4ed,#8c40c1)] bg-[length:100%_3px] bg-bottom bg-no-repeat pb-2">
              {sectionHeading}
            </span>
          </h2>
        </div>
      ) : null}
    </div>
  );
}

export const propertyDetailTabs = [
  {
    id: "about",
    label: "About",
    heading: "About Helloworld Park Square",
  },
  {
    id: "amenities",
    label: "Amenities",
    heading: "Amenities at Helloworld Park Square",
  },
  {
    id: "nearby",
    label: "Nearby Places",
    heading: "Nearby Places",
  },
  {
    id: "reviews",
    label: "Reviews",
    heading: "Reviews",
  },
] as const;

export type PropertyDetailTab = (typeof propertyDetailTabs)[number]["id"];
