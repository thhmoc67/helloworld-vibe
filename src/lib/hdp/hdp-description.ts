import { formatCityDisplayName } from "@/src/tokens/cities";
import { getPublicSiteUrl } from "@/src/lib/schema";
import type { GoogleData, Property } from "@/src/models/property";

function titleCaseLocation(value: string): string {
  const raw = (value || "").replace(/_/g, " ").replace(/-/g, " ").trim();
  if (!raw) return "";
  return raw
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function formatGenderResidents(gender: string): string {
  const normalized = (gender || "").toLowerCase();
  if (!normalized || normalized.includes("any") || normalized === "unisex") {
    return "all";
  }
  if (normalized.includes("female")) return "female";
  if (normalized.includes("male")) return "male";
  return normalized.trim() || "all";
}

function humanizeAmenity(value: string): string {
  return value
    .replace(/[_-]+/g, " ")
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function formatList(items: string[], max = 8): string {
  const unique = Array.from(
    new Set(
      (items || [])
        .map((item) => humanizeAmenity(String(item || "").trim()))
        .filter(Boolean),
    ),
  );
  const slice = unique.slice(0, max);
  return slice.length ? slice.join(", ") : "essential facilities";
}

export function buildHdpMetaDescription(
  property: Property,
  googleData: GoogleData | null | undefined,
  canonicalPath: string,
): string {
  const city = formatCityDisplayName(property.address?.city || property.city || "");
  const locality = titleCaseLocation(property.locality || "");
  const displayName = property.display_name || property.name || "HelloWorld";
  const gender = formatGenderResidents(property.gender || "");
  const furnishing = (property.furnishing_type || "fully furnished")
    .trim()
    .toLowerCase();
  const minRent =
    property.min_rent != null && property.min_rent > 0
      ? new Intl.NumberFormat("en-IN").format(property.min_rent)
      : "—";
  const rentIncludes = formatList(property.rent_includes || []);
  const amenities = formatList(property.amenities || []);
  const line1 = (property.address?.line1 || "").trim();
  const localityForAddress =
    locality || titleCaseLocation(property.address?.line2 || "");
  const inLocation =
    locality && city ? `${locality}, ${city}` : city || locality || "this area";
  const ratingVal = googleData?.google_rating;
  const hasRating =
    ratingVal != null && !Number.isNaN(Number(ratingVal)) && Number(ratingVal) > 0;
  const reviewCount =
    googleData?.google_reviews_new?.length ??
    googleData?.google_reviews?.length ??
    0;
  let ratingPart = "";
  if (hasRating) {
    const rating = Number(ratingVal);
    const stars = Number.isInteger(rating) ? String(rating) : rating.toFixed(1);
    ratingPart =
      reviewCount > 0
        ? ` Rated ${stars} stars by ${reviewCount}+ users.`
        : ` Rated ${stars} stars on Google.`;
  }
  const baseUrl = getPublicSiteUrl();
  const bookingPath = `${baseUrl}/${canonicalPath.replace(/^\//, "")}/booking`;
  const locatedAt =
    line1 && localityForAddress
      ? `${line1}, ${localityForAddress}`
      : line1 || localityForAddress || city || "the property";

  return (
    `Looking for a fully furnished PG or coliving space in ${inLocation}? ${displayName} is a top-rated option for ${gender} residents, offering ${furnishing} rooms starting from ₹${minRent} with ${rentIncludes} included. The property features amenities like ${amenities}, along with WiFi, housekeeping, and secure living. Located at ${locatedAt}, it provides excellent connectivity to key areas of ${city}.` +
    ratingPart +
    ` You can check availability and book directly at ${bookingPath}.`
  );
}
