import PRESENT_CITIES from "@/src/constants/cities";
import { capitalizeFirstLetter } from "@/src/lib/string-utils";

const cityLabels = {
  ahmedabad: "Ahmedabad",
  bangalore: "Bangalore",
  coimbatore: "Coimbatore",
  chennai: "Chennai",
  delhi: "Delhi",
  goa: "Goa",
  gurugram: "Gurugram",
  hyderabad: "Hyderabad",
  indore: "Indore",
  jaipur: "Jaipur",
  kolkata: "Kolkata",
  kota: "Kota",
  mumbai: "Mumbai",
  noida: "Noida",
  pune: "Pune",
  visakhapatnam: "Visakhapatnam",
} as const satisfies Record<(typeof PRESENT_CITIES)[number], string>;

export const cities = PRESENT_CITIES.map((slug) => ({
  slug,
  label: cityLabels[slug],
}));

export type CitySlug = (typeof PRESENT_CITIES)[number];

export const defaultCitySlug: CitySlug = "bangalore";

export function getCityLabel(slug: string) {
  const key = slug as CitySlug;
  return cityLabels[key] ?? slug;
}

/** Normalizes API/URL city strings for display (e.g. bengaluru → Bangalore). */
export function formatCityDisplayName(value: string) {
  const normalized = value.trim().toLowerCase().replace(/_/g, " ").replace(/\s+/g, " ");
  if (normalized === "bengaluru" || normalized === "bangalore") return "Bangalore";
  const slug = normalized.replace(/\s+/g, "_");
  if (isCitySlug(slug)) return cityLabels[slug];
  return capitalizeFirstLetter(normalized);
}

export function isCitySlug(value: string): value is CitySlug {
  return (PRESENT_CITIES as readonly string[]).includes(value);
}
