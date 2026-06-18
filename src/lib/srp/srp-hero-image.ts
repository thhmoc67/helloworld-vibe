import { imageUrlFormatter } from "@/src/lib/images";
import type { SrpPageConfig } from "@/src/lib/srp/resolve-srp-page";
import { srpHeroPlaceholderImage } from "@/src/tokens/srp";

function formatHeroImageUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return "";

  if (trimmed.startsWith("/")) return trimmed;

  if (trimmed.includes("http")) {
    return trimmed
      .replace(/\(/g, "%28")
      .replace(/\)/g, "%29")
      .replace(/ /g, "%20");
  }

  return imageUrlFormatter("srp", trimmed);
}

export function resolveSrpHeroImageSrc(
  config: SrpPageConfig,
  override?: string,
): string {
  const property = config.properties[0];
  const raw =
    override?.trim() ||
    property?.property_image?.[0] ||
    property?.image ||
    property?.srp_image ||
    property?.hdp_image ||
    "";

  if (typeof raw !== "string" || !raw.trim()) {
    return srpHeroPlaceholderImage;
  }

  return formatHeroImageUrl(raw) || srpHeroPlaceholderImage;
}
