"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { fetchLocalitySuggest } from "@/src/apis/search";
import { cn } from "@/src/lib/cn";
import { useDebounce } from "@/src/lib/use-debounce";
import {
  cities,
  defaultCitySlug,
  getCityLabel,
  type CitySlug,
} from "@/src/tokens/cities";

const LOCALITY_SUGGEST_DEBOUNCE_MS = 500;
const LOCALITY_SUGGEST_MIN_LENGTH = 3;

export interface LocationSearchValue {
  city: CitySlug;
  locality: string;
}

export interface LocationSearchProps {
  className?: string;
  city?: CitySlug;
  defaultCity?: CitySlug;
  locality?: string;
  defaultLocality?: string;
  localityPlaceholder?: string;
  strictLocality?: boolean;
  onCityChange?: (city: CitySlug) => void;
  onLocalityChange?: (locality: string) => void;
  onSearch?: (value: LocationSearchValue) => void;
}

type Panel = "city" | "locality" | null;

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="10" r="2" fill="currentColor" />
      <path
        d="M10 2.5V5M10 15V17.5M2.5 10H5M15 10H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
        stroke="currentColor"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 17.5L13.875 13.875"
        stroke="currentColor"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchDropdown({
  open,
  children,
  className,
  labelledBy,
}: {
  open: boolean;
  children: ReactNode;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <div
      role="listbox"
      aria-labelledby={labelledBy}
      className={cn(
        "absolute top-[calc(100%+10px)] z-50 max-h-[min(16rem,50vh)] overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-lg",
        "transition-all duration-200 ease-out motion-reduce:transition-none",
        open
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-2 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function LocationSearch({
  className,
  city: cityProp,
  defaultCity = defaultCitySlug,
  locality: localityProp,
  defaultLocality = "",
  localityPlaceholder = "Search for Localities",
  strictLocality = true,
  onCityChange,
  onLocalityChange,
  onSearch,
}: LocationSearchProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const cityButtonId = useId();
  const localityInputId = useId();

  const [internalCity, setInternalCity] = useState<CitySlug>(defaultCity);
  const [internalLocality, setInternalLocality] = useState(defaultLocality);
  const [localityQuery, setLocalityQuery] = useState(defaultLocality);
  const [activePanel, setActivePanel] = useState<Panel>(null);
  const [highlightedCity, setHighlightedCity] = useState<CitySlug | null>(null);
  const [highlightedLocality, setHighlightedLocality] = useState<string | null>(
    null,
  );
  const [localitySuggestions, setLocalitySuggestions] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [hasFetchedSuggestions, setHasFetchedSuggestions] = useState(false);

  const debouncedLocalityQuery = useDebounce(
    localityQuery,
    LOCALITY_SUGGEST_DEBOUNCE_MS,
  );

  const city = cityProp ?? internalCity;
  const locality = localityProp ?? internalLocality;

  const cityOpen = activePanel === "city";
  const localityOpen = activePanel === "locality";
  const trimmedLocalityQuery = localityQuery.trim();
  const canSuggestLocalities =
    trimmedLocalityQuery.length >= LOCALITY_SUGGEST_MIN_LENGTH;
  const isDebouncingSuggestions =
    canSuggestLocalities && trimmedLocalityQuery !== debouncedLocalityQuery.trim();
  const showLocalityDropdown =
    localityOpen &&
    canSuggestLocalities &&
    (isLoadingSuggestions ||
      isDebouncingSuggestions ||
      hasFetchedSuggestions);

  function updateCity(nextCity: CitySlug) {
    if (cityProp === undefined) setInternalCity(nextCity);
    if (localityProp === undefined) {
      setInternalLocality("");
      setLocalityQuery("");
    }
    setLocalitySuggestions([]);
    setHasFetchedSuggestions(false);
    onCityChange?.(nextCity);
    setActivePanel(null);
    setHighlightedCity(null);
  }

  function updateLocality(nextLocality: string) {
    if (localityProp === undefined) {
      setInternalLocality(nextLocality);
      setLocalityQuery(nextLocality);
    }
    onLocalityChange?.(nextLocality);
    setActivePanel(null);
    setHighlightedLocality(null);
  }

  function handleSearch() {
    onSearch?.({ city, locality: localityQuery.trim() || locality });
    setActivePanel(null);
  }

  useEffect(() => {
    const query = debouncedLocalityQuery.trim();

    if (query.length < LOCALITY_SUGGEST_MIN_LENGTH) {
      setLocalitySuggestions([]);
      setIsLoadingSuggestions(false);
      setHasFetchedSuggestions(false);
      return;
    }

    const abortController = new AbortController();

    async function loadSuggestions() {
      setIsLoadingSuggestions(true);
      setHasFetchedSuggestions(false);

      try {
        const { success, data } = await fetchLocalitySuggest({
          city,
          keyword: query,
          campaign: strictLocality ? "ok" : "",
          signal: abortController.signal,
        });

        if (abortController.signal.aborted) return;

        setLocalitySuggestions(success ? data.locality : []);
        setHasFetchedSuggestions(true);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setLocalitySuggestions([]);
        setHasFetchedSuggestions(true);
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoadingSuggestions(false);
        }
      }
    }

    void loadSuggestions();

    return () => {
      abortController.abort();
    };
  }, [city, debouncedLocalityQuery, strictLocality]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setActivePanel(null);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActivePanel(null);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={rootRef} className={cn("relative w-full min-w-0", className)}>
      <div
        className={cn(
          "flex flex-col gap-2 border border-gray-200 bg-white p-2 shadow-md",
          "rounded-2xl sm:flex-row sm:items-center sm:gap-0 sm:rounded-full",
        )}
      >
        <div className="relative w-full min-w-0 sm:w-auto sm:shrink-0">
          <button
            id={cityButtonId}
            type="button"
            aria-haspopup="listbox"
            aria-expanded={cityOpen}
            onClick={() =>
              setActivePanel((panel) => (panel === "city" ? null : "city"))
            }
            className="flex w-full min-w-0 items-center gap-2.5 rounded-xl px-2 py-2 transition-colors hover:bg-gray-50 sm:w-auto sm:gap-3 sm:rounded-full sm:py-1.5"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-900 sm:size-10">
              <LocationIcon className="size-5" />
            </span>
            <span className="min-w-0 text-left">
              <span className="block text-xs text-gray-500">You are in</span>
              <span className="flex min-w-0 items-center gap-1 text-sm font-bold text-hello-lime-700">
                <span className="truncate">{getCityLabel(city)}</span>
                <ChevronDownIcon
                  className={cn(
                    "size-4 shrink-0 text-gray-600 transition-transform duration-200 motion-reduce:transition-none",
                    cityOpen && "rotate-180",
                  )}
                />
              </span>
            </span>
          </button>

          <SearchDropdown
            open={cityOpen}
            labelledBy={cityButtonId}
            className="left-0 right-0 w-full p-2 sm:right-auto sm:w-[min(100vw-3rem,17.5rem)]"
          >
            {cities.map((option) => {
              const isSelected = option.slug === city;
              const isHighlighted = highlightedCity === option.slug;

              return (
                <button
                  key={option.slug}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setHighlightedCity(option.slug)}
                  onMouseLeave={() => setHighlightedCity(null)}
                  onClick={() => updateCity(option.slug)}
                  className={cn(
                    "w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-gray-900 transition-colors",
                    isSelected || isHighlighted
                      ? "bg-hello-lime-50"
                      : "hover:bg-hello-lime-50",
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </SearchDropdown>
        </div>

        <span
          aria-hidden
          className="h-px w-full shrink-0 bg-gray-200 sm:mx-2 sm:h-10 sm:w-px"
        />

        <div className="flex w-full min-w-0 flex-1 items-center">
          <div className="relative min-w-0 flex-1">
            <label htmlFor={localityInputId} className="sr-only">
              {localityPlaceholder}
            </label>
            <input
              id={localityInputId}
              type="search"
              value={localityQuery}
              placeholder={localityPlaceholder}
              onChange={(event) => {
                setLocalityQuery(event.target.value);
                setActivePanel("locality");
                setHighlightedLocality(null);
                if (event.target.value.trim().length < LOCALITY_SUGGEST_MIN_LENGTH) {
                  setLocalitySuggestions([]);
                  setHasFetchedSuggestions(false);
                }
              }}
              onFocus={() => setActivePanel("locality")}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  if (highlightedLocality) {
                    updateLocality(highlightedLocality);
                    return;
                  }
                  if (localitySuggestions[0]) {
                    updateLocality(localitySuggestions[0]);
                    return;
                  }
                  handleSearch();
                }
              }}
              className="w-full bg-transparent px-2 py-2.5 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none sm:px-3"
            />

            <SearchDropdown
              open={showLocalityDropdown}
              className="left-0 right-0"
            >
              {isLoadingSuggestions || isDebouncingSuggestions ? (
                <p className="px-4 py-3.5 text-sm text-gray-500">Searching…</p>
              ) : localitySuggestions.length > 0 ? (
                localitySuggestions.map((option, index) => {
                  const isHighlighted =
                    highlightedLocality === option ||
                    (highlightedLocality === null &&
                      index === 0 &&
                      trimmedLocalityQuery);

                  return (
                    <button
                      key={option}
                      type="button"
                      role="option"
                      aria-selected={locality === option}
                      onMouseEnter={() => setHighlightedLocality(option)}
                      onMouseLeave={() => setHighlightedLocality(null)}
                      onClick={() => updateLocality(option)}
                      className={cn(
                        "w-full border-b border-gray-100 px-4 py-3.5 text-left text-sm text-gray-900 transition-colors last:border-b-0",
                        isHighlighted ? "bg-gray-25" : "hover:bg-gray-25",
                      )}
                    >
                      {option}
                    </button>
                  );
                })
              ) : (
                <p className="px-4 py-3.5 text-sm text-gray-500">
                  No locality found
                </p>
              )}
            </SearchDropdown>
          </div>

          <button
            type="button"
            aria-label="Search localities"
            onClick={handleSearch}
            className={cn(
              "group ml-1 flex h-10 w-10 shrink-0 items-center justify-center gap-0 overflow-visible rounded-full bg-hello-lime-500 text-white",
              "transition-[width,background-color,padding,gap] duration-200 ease-out motion-reduce:transition-none",
              "hover:w-[6.5rem] hover:justify-start hover:gap-2 hover:bg-hello-lime-600 hover:px-3",
              "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-hello-lime-100",
              "sm:h-11 sm:w-11 sm:hover:w-[6.75rem] sm:hover:px-3.5",
            )}
          >
            <SearchIcon className="size-5 shrink-0" />
            <span
              aria-hidden
              className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-[max-width,opacity] duration-200 ease-out motion-reduce:transition-none group-hover:max-w-[3.5rem] group-hover:opacity-100"
            >
              Search
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
