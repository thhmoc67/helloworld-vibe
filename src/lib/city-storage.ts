import {
  cities,
  defaultCitySlug,
  type CitySlug,
} from "@/src/tokens/cities";

const STORAGE_KEY = "helloworld-selected-city";

export const CITY_CHANGE_EVENT = "helloworld:city-change";

const validCitySlugs = new Set(cities.map((city) => city.slug));

function isCitySlug(value: string): value is CitySlug {
  return validCitySlugs.has(value as CitySlug);
}

export function readStoredCity(): CitySlug {
  if (typeof window === "undefined") return defaultCitySlug;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw && isCitySlug(raw)) return raw;

  return defaultCitySlug;
}

export function persistCity(city: CitySlug): void {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(STORAGE_KEY, city);
  window.dispatchEvent(
    new CustomEvent<CitySlug>(CITY_CHANGE_EVENT, { detail: city }),
  );
}
