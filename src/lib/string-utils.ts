export function capitalizeFirstLetter(value: unknown): string {
  const string = String(value ?? "");
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function localitySlugToName(slug: string): string {
  const raw = (slug || "").replace(/-/g, " ").replace(/_/g, " ").trim();
  if (!raw) return "";
  return raw
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/** Display name → URL slug (e.g. "Hsr Layout" → "hsr-layout"). */
export function localityNameToSlug(name: string): string {
  if (!name || typeof name !== "string") return "";
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/_/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}
