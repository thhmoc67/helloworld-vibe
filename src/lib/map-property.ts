import { imageUrlFormatter } from "@/src/lib/images";
import type { Property } from "@/src/models/property";
import type { SrpCardStatusLabel } from "@/src/tokens/srp-card";
import type { LocalityProperty } from "@/src/tokens/locality";

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
  const primary = property.image || property.srp_image || property.hdp_image;
  const gallery = Array.isArray(property.property_image)
    ? property.property_image
    : [];
  const urls = [primary, ...gallery]
    .filter(Boolean)
    .map((url) => imageUrlFormatter("srp", String(url)));
  return urls.length > 0 ? urls : ["/assets/community/hero/hero-1.png"];
}

export function mapPropertyToSrpCard(
  property: Property,
  subtitle: string,
  context?: { city?: string; locality?: string; propertyUrl?: string },
): LocalityProperty {
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
    city: context?.city,
    location: context?.locality,
    propertyUrl: context?.propertyUrl,
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
