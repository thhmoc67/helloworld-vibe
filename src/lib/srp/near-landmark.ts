import { capitalizeFirstLetter } from "@/src/lib/string-utils";
import type { ParsedNearLandmarkSrpSlug } from "@/src/lib/srp-slug-parse";
import type { LandmarkPlaceApi } from "@/src/models/nearby-place";

function humanizeLandmark(slug: string): string {
  return String(slug || "")
    .trim()
    .replace(/-/g, " ")
    .replace(/_/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => capitalizeFirstLetter(word))
    .join(" ");
}

function humanizeCity(city: string): string {
  return String(city || "")
    .trim()
    .replace(/-/g, " ")
    .replace(/_/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => capitalizeFirstLetter(word))
    .join(" ");
}

function formatInrInteger(n: number): string {
  return Math.round(n).toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

/** Type-specific meta description; never reuse shared landmark API copy across URL families. */
function getNearLandmarkMetaDescription(
  parsed: ParsedNearLandmarkSrpSlug,
  nearPlace: string,
  options?: { minRent?: number }
): string {
  if (parsed.livingType === "hostels") {
    if (parsed.slugGender === "male only") {
      return `Find fully furnished boys hostels near ${nearPlace}. Safe student stays with meals, WiFi and community. Browse and book on HelloWorld.`;
    }
    if (parsed.slugGender === "female only") {
      return `Find safe and fully furnished girls hostels near ${nearPlace}. Student-friendly stays with meals, WiFi and community. Book on HelloWorld.`;
    }
    return `Explore boys and girls hostels near ${nearPlace}. Affordable student hostels with meals, WiFi and flexible stays. Book on HelloWorld.`;
  }

  if (parsed.slugGender === "male only") {
    return `Discover fully furnished boys PG near ${nearPlace}. Gents PG with WiFi, meals and flexible stays. Browse and book on HelloWorld.`;
  }
  if (parsed.slugGender === "female only") {
    return `Find safe and fully furnished girls PG near ${nearPlace}. Ladies PG with WiFi, meals and flexible stays. Browse and book on HelloWorld.`;
  }
  if (
    parsed.livingType === "coliving" &&
    parsed.colivingNearKind === "room_for_rent"
  ) {
    const minRent = options?.minRent;
    const rentHint =
      minRent != null && minRent > 0
        ? ` Starting from ₹${formatInrInteger(minRent)}.`
        : "";
    return `Find single rooms for rent near ${nearPlace}.${rentHint} Fully furnished, no brokerage, flexible stays. Book your private space on HelloWorld.`;
  }
  return `Browse furnished PG near ${nearPlace}. Coliving and PG with WiFi, meals and flexible stays. Find your stay on HelloWorld.`;
}

export function getNearLandmarkSeo(
  parsed: ParsedNearLandmarkSrpSlug,
  place?: Partial<LandmarkPlaceApi>,
  options?: { minRent?: number }
): {
  pageTitle: string;
  metaDescription: string;
  pageDescription: string;
  headerH1: string;
} {
  const landmarkName =
    String(place?.display_name || "").trim() || humanizeLandmark(parsed.landmarkSlug);
  const localityName = humanizeCity(String(place?.locality || ""));
  const cityName = humanizeCity(String(place?.city || ""));
  const nearPlace = [landmarkName, localityName, cityName]
    .filter(Boolean)
    .join(", ");
  const apiDescription =
    String(place?.landmark_description || "").trim() ||
    String(place?.nearby_description || "").trim();
  const metaDescription = getNearLandmarkMetaDescription(
    parsed,
    nearPlace,
    options
  );
  const pageDescription = apiDescription || metaDescription;

  if (parsed.livingType === "hostels") {
    if (parsed.slugGender === "male only") {
      return {
        pageTitle: `Boys Hostel near ${nearPlace}`,
        metaDescription,
        pageDescription,
        headerH1: `Fully Furnished Boys Hostel near ${nearPlace}`,
      };
    }
    if (parsed.slugGender === "female only") {
      return {
        pageTitle: `Girls Hostel near ${nearPlace}`,
        metaDescription,
        pageDescription,
        headerH1: `Safe & Fully Furnished Girls Hostel near ${nearPlace}`,
      };
    }
    return {
      pageTitle: `Hostels near ${nearPlace}`,
      metaDescription,
      pageDescription,
      headerH1: `Best Hostels near ${nearPlace}`,
    };
  }

  if (parsed.slugGender === "male only") {
    return {
      pageTitle: `Boys PG near ${nearPlace}`,
      metaDescription,
      pageDescription,
      headerH1: `Fully Furnished Boys PG near ${nearPlace}`,
    };
  }
  if (parsed.slugGender === "female only") {
    return {
      pageTitle: `Girls PG near ${nearPlace}`,
      metaDescription,
      pageDescription,
      headerH1: `Safe & Fully Furnished Girls PG near ${nearPlace}`,
    };
  }
  if (
    parsed.livingType === "coliving" &&
    parsed.colivingNearKind === "room_for_rent"
  ) {
    const minRent = options?.minRent;
    const pageTitle =
      minRent != null && minRent > 0
        ? `Single Room for Rent near ${nearPlace} | Starting ₹${formatInrInteger(minRent)}`
        : `Single Room for Rent near ${nearPlace} | HelloWorld`;
    return {
      pageTitle,
      metaDescription,
      pageDescription,
      headerH1: `Rooms for Rent near ${nearPlace} – Fully Furnished & Ready to Move`,
    };
  }
  return {
    pageTitle: `PG near ${nearPlace}`,
    metaDescription,
    pageDescription,
    headerH1: `Furnished PG near ${nearPlace}`,
  };
}

export function getNearLandmarkListLabel(
  parsed: ParsedNearLandmarkSrpSlug,
  landmarkSlug: string
): string {
  const landmarkName = humanizeLandmark(landmarkSlug);
  if (parsed.livingType === "hostels") {
    if (parsed.slugGender === "male only") return `Boys hostels near ${landmarkName}`;
    if (parsed.slugGender === "female only")
      return `Girls hostels near ${landmarkName}`;
    return `Student hostels near ${landmarkName}`;
  }
  if (parsed.slugGender === "male only") return `PG for boys near ${landmarkName}`;
  if (parsed.slugGender === "female only")
    return `PG for girls near ${landmarkName}`;
  if (parsed.colivingNearKind === "room_for_rent")
    return `Room for rent near ${landmarkName}`;
  return `PG near ${landmarkName}`;
}

export function buildNearLandmarkHref(
  parsed: ParsedNearLandmarkSrpSlug,
  landmarkSlug: string
): string {
  const slug = String(landmarkSlug || "")
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (!slug) return "";
  if (parsed.livingType === "hostels") {
    if (parsed.slugGender === "male only") return `/boys-hostel-near-${slug}`;
    if (parsed.slugGender === "female only") return `/girls-hostel-near-${slug}`;
    return `/hostel-near-${slug}`;
  }
  if (parsed.slugGender === "male only") return `/pg-for-boys-near-${slug}`;
  if (parsed.slugGender === "female only") return `/pg-for-girls-near-${slug}`;
  if (parsed.colivingNearKind === "room_for_rent")
    return `/room-for-rent-near-${slug}`;
  return `/pg-near-${slug}`;
}
