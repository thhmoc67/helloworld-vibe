import type { LocalityListItem } from "@/src/apis/srp";

/**
 * Kota coaching belts used on /hostels-in-kota/{slug}/… (see hdpRedirectsList).
 * Merged with `v3/locality/list` so the city SRP always surfaces key areas.
 */
export const KOTA_HOSTEL_SRP_LOCALITY_FALLBACK: LocalityListItem[] = [
  { name: "Electronic Complex", slug: "electronic-complex" },
  { name: "IPIA", slug: "ipia" },
  { name: "Jawahar Nagar", slug: "jawahar-nagar" },
  { name: "Kota", slug: "kota" },
  { name: "Landmark City", slug: "landmark-city" },
  { name: "Rajeev Gandhi Nagar", slug: "rajeev-gandhi-nagar" },
  { name: "Talwandi", slug: "talwandi" },
  { name: "Vigyan Nagar", slug: "vigyan-nagar" },
];

function normLocalityKey(slug: string): string {
  return String(slug || "")
    .trim()
    .toLowerCase()
    .replace(/_/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Prefer API names/slugs; fill gaps from {@link KOTA_HOSTEL_SRP_LOCALITY_FALLBACK}. */
export function mergeKotaHostelSrpLocalities(
  api: LocalityListItem[]
): LocalityListItem[] {
  const map = new Map<string, LocalityListItem>();
  for (const item of api) {
    const k = normLocalityKey(item.slug);
    if (k) map.set(k, item);
  }
  for (const item of KOTA_HOSTEL_SRP_LOCALITY_FALLBACK) {
    const k = normLocalityKey(item.slug);
    if (k && !map.has(k)) map.set(k, item);
  }
  return Array.from(map.values()).sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
  );
}
