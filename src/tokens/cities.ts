export const cities = [
  { slug: "ahmedabad", label: "Ahmedabad" },
  { slug: "bangalore", label: "Bengaluru" },
  { slug: "coimbatore", label: "Coimbatore" },
  { slug: "chennai", label: "Chennai" },
  { slug: "delhi", label: "Delhi" },
  { slug: "goa", label: "Goa" },
  { slug: "gurugram", label: "Gurugram" },
  { slug: "hyderabad", label: "Hyderabad" },
  { slug: "indore", label: "Indore" },
  { slug: "jaipur", label: "Jaipur" },
] as const;

export type CitySlug = (typeof cities)[number]["slug"];

export const defaultCitySlug: CitySlug = "bangalore";

export function getCityLabel(slug: string) {
  return cities.find((city) => city.slug === slug)?.label ?? slug;
}
