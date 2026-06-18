import { imageUrlFormatter } from "@/src/lib/images";
import { getPropertyHref } from "@/src/lib/sitemap-slug";
import { getPublicSiteUrl } from "@/src/lib/schema";
import type { Property } from "@/src/models/property";
import { srpCardDefaultImage, type SrpCardStatusLabel } from "@/src/tokens/srp-card";
import type { LocalityProperty } from "@/src/tokens/locality";

function normalizeImageSource(value: unknown): string {
  const trimmed = String(value ?? "").trim();
  if (!trimmed || trimmed === "null" || trimmed === "undefined") return "";
  return trimmed;
}

function genderLabel(gender?: string): string | undefined {
  switch (gender) {
    case "MALE":
      return "Men Only";
    case "FEMALE":
      return "Women Only";
    case "ALL":
      return "Unisex";
    default:
      return undefined;
  }
}

function statusLabel(property: Property): SrpCardStatusLabel | undefined {
  if (property.lightning_deal) return "trending";
  if (property.available_beds != null && property.available_beds <= 3) {
    return "filling-fast";
  }
  return undefined;
}

function propertyImages(property: Property): readonly string[] {
  const candidates = [
    property.image,
    property.srp_image,
    property.hdp_image,
    ...(Array.isArray(property.property_image) ? property.property_image : []),
  ];

  const urls = candidates
    .map(normalizeImageSource)
    .filter(Boolean)
    .map((url) => imageUrlFormatter("srp", url))
    .filter((url) => url.length > 0);

  const unique = [...new Set(urls)];
  return unique.length > 0 ? unique : [srpCardDefaultImage];
}

export function mapPropertyToSrpCard(
  property: Property,
  subtitle: string,
  context?: { city?: string; locality?: string; propertyUrl?: string },
): LocalityProperty {
  const href = getPropertyHref(property);
  const propertyUrl =
    context?.propertyUrl ?? `${getPublicSiteUrl()}${href}`;

  return {
    id: String(property.id),
    propertyId: property.id,
    name: property.display_name || property.name,
    subtitle,
    images: propertyImages(property),
    rating: Number(property.address?.latitude ? 4.5 : 4.5),
    roomTypes: ["Private", "Double", "Triple"],
    rent: property.min_rent ?? 0,
    statusLabel: statusLabel(property),
    genderLabel: genderLabel(property.gender),
    city: context?.city ?? property.address?.city ?? property.city,
    location: context?.locality ?? property.locality,
    href,
    propertyUrl,
  };
}

export function mapPropertiesToSrpCards(
  properties: Property[],
  subtitleBuilder: (property: Property) => string,
  context?: { city?: string; locality?: string },
): LocalityProperty[] {
  return properties.map((property) =>
    mapPropertyToSrpCard(property, subtitleBuilder(property), {
      city: context?.city,
      locality: context?.locality ?? subtitleBuilder(property),
    }),
  );
}
