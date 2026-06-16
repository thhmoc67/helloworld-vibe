import { getCitywiseSrpSeoMetadata } from "@/src/constants/srp-seo-metadata";
import { capitalizeFirstLetter, localitySlugToName } from "@/src/lib/string-utils";
import { isKotaCity } from "@/src/lib/sitemap-slug";
import type { Property } from "@/src/models/property";

export function colivingCityKeyFromMarketingSlug(srpPath: string): string | null {
  const prefix = "coliving-in-";
  const path = String(srpPath || "").trim().toLowerCase();
  if (!path.startsWith(prefix)) return null;
  const tail = path.slice(prefix.length).replace(/^\/+|\/+$/g, "");
  if (!tail || isKotaCity(tail)) return null;
  return tail;
}

export function minRentFromProperties(properties: Property[]): number | undefined {
  let min: number | undefined;
  for (const property of properties) {
    const rent = Number(property?.min_rent);
    if (!Number.isFinite(rent) || rent <= 0) continue;
    min = min === undefined ? rent : Math.min(min, rent);
  }
  return min;
}

function formatInrInteger(value: number): string {
  return Math.round(value).toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

export function getSrpPageTitle(
  city: string,
  livingType: string,
  slugGender?: "male only" | "female only",
  isColivingSrpFamily?: boolean,
): string {
  const cityLabel = capitalizeFirstLetter(city.replace(/_/g, " "));
  const genderWord =
    slugGender === "male only"
      ? "Boys "
      : slugGender === "female only"
        ? "Girls "
        : "";
  const kota = isKotaCity(city);
  const prefix =
    livingType === "hostels"
      ? kota
        ? `${genderWord}Student Hostels in ${cityLabel}`
        : `${genderWord}Student Hostels & PG in ${cityLabel}`
      : slugGender === "male only"
        ? `PG for Men in ${cityLabel} | Gents & Boys PG`
        : slugGender === "female only"
          ? `PG for Women in ${cityLabel} | Ladies & Girls PG`
          : isColivingSrpFamily
            ? `Coliving PG in ${cityLabel}`
            : `PG in ${cityLabel}`;
  if (slugGender === "male only" || slugGender === "female only") return prefix;
  return `${prefix} | HelloWorld`;
}

export function getSrpMetaDescription(
  city: string,
  livingType: string,
  total?: number,
  slugGender?: "male only" | "female only",
): string {
  const citySeoMetadata = getCitywiseSrpSeoMetadata(
    city,
    livingType as "coliving" | "hostels",
    slugGender,
  );
  if (citySeoMetadata) return citySeoMetadata.metaDescription;

  const cityLabel = capitalizeFirstLetter(city.replace(/_/g, " "));
  const hasCount = total != null && total > 0;
  const boysGirls =
    slugGender === "male only"
      ? "boys' "
      : slugGender === "female only"
        ? "girls' "
        : "";

  if (livingType === "hostels") {
    return hasCount
      ? `Explore ${total} ${boysGirls}student hostels and PG in ${cityLabel}. HelloWorld offers safe, affordable rooms with meals, WiFi and community. Book a visit or rent online.`
      : `Explore ${boysGirls}student hostels and PG in ${cityLabel}. HelloWorld offers safe, affordable rooms with meals, WiFi and community. Book a visit or rent online.`;
  }
  if (slugGender === "male only") {
    return hasCount
      ? `Find ${total} gents PG in ${cityLabel}. HelloWorld offers furnished rooms, community living, WiFi and flexible stays. Browse properties and book online.`
      : `Find gents PG in ${cityLabel}. HelloWorld offers furnished rooms, community living, WiFi and flexible stays. Browse properties and book online.`;
  }
  if (slugGender === "female only") {
    return hasCount
      ? `Find ${total} ladies PG in ${cityLabel}. HelloWorld offers furnished rooms, community living, WiFi and flexible stays. Browse properties and book online.`
      : `Find ladies PG in ${cityLabel}. HelloWorld offers furnished rooms, community living, WiFi and flexible stays. Browse properties and book online.`;
  }
  return hasCount
    ? `Find ${total} PG in ${cityLabel}. HelloWorld offers furnished rooms, community living, WiFi and flexible stays. Browse properties and book online.`
    : `Find PG in ${cityLabel}. HelloWorld offers furnished rooms, community living, WiFi and flexible stays. Browse properties and book online.`;
}

export function getSrpPageDescription(
  city: string,
  livingType: string,
  total?: number,
  slugGender?: "male only" | "female only",
): string {
  const citySeoMetadata = getCitywiseSrpSeoMetadata(
    city,
    livingType as "coliving" | "hostels",
    slugGender,
  );
  if (citySeoMetadata) return citySeoMetadata.pageDescription;
  return getSrpMetaDescription(city, livingType, total, slugGender);
}

export function getFlatColivingLocalitySeo(city: string, localitySlug: string) {
  const localityName = localitySlugToName(localitySlug);
  const cityLabel = capitalizeFirstLetter(city.replace(/_/g, " "));
  return {
    pageTitle: `Coliving in ${localityName}, ${cityLabel} | Furnished PG for Students & Professionals`,
    headerH1: `Fully Furnished Coliving in ${localityName}, ${cityLabel} for Students and Working Professionals`,
  };
}

export function getFlatColivingLocalityMetaDescription(
  city: string,
  localityName: string,
  total?: number,
): string {
  const cityLabel = capitalizeFirstLetter(city.replace(/_/g, " "));
  const hasCount = total != null && total > 0;
  return hasCount
    ? `Find ${total} coliving PGs in ${localityName}, ${cityLabel}. HelloWorld offers furnished rooms, WiFi, community living and flexible stays. Browse and book online.`
    : `Find coliving PGs in ${localityName}, ${cityLabel}. HelloWorld offers furnished rooms, WiFi, community living and flexible stays. Browse and book online.`;
}

export function getFlatGenderLocalityPageTitle(
  city: string,
  localityName: string,
  slugGender?: "male only" | "female only",
): string {
  const cityLabel = capitalizeFirstLetter(city.replace(/_/g, " "));
  if (slugGender === "male only") {
    return `Boys PG in ${localityName}, ${cityLabel} | Furnished PG for Men`;
  }
  if (slugGender === "female only") {
    return `Girls PG in ${localityName}, ${cityLabel} | Safe & Furnished PG for Women`;
  }
  return `PG in ${localityName}, ${cityLabel} | HelloWorld`;
}

export function getFlatGenderLocalityMetaDescription(
  city: string,
  localityName: string,
  total?: number,
  slugGender?: "male only" | "female only",
): string {
  const cityLabel = capitalizeFirstLetter(city.replace(/_/g, " "));
  const hasCount = total != null && total > 0;
  if (slugGender === "male only") {
    return hasCount
      ? `Find ${total} PG for men in ${localityName}, ${cityLabel}. HelloWorld offers furnished rooms, WiFi, community living and flexible stays. Browse and book online.`
      : `Find PG for men in ${localityName}, ${cityLabel}. HelloWorld offers furnished rooms, WiFi, community living and flexible stays. Browse and book online.`;
  }
  if (slugGender === "female only") {
    return hasCount
      ? `Find ${total} PG for women in ${localityName}, ${cityLabel}. HelloWorld offers furnished rooms, WiFi, community living and flexible stays. Browse and book online.`
      : `Find PG for women in ${localityName}, ${cityLabel}. HelloWorld offers furnished rooms, WiFi, community living and flexible stays. Browse and book online.`;
  }
  return hasCount
    ? `Find ${total} PG in ${localityName}, ${cityLabel}. HelloWorld offers furnished rooms, community living, WiFi and flexible stays. Browse and book online.`
    : `Find PG in ${localityName}, ${cityLabel}. HelloWorld offers furnished rooms, community living, WiFi and flexible stays. Browse and book online.`;
}

export function getFlatGenderLocalityHeaderH1(
  city: string,
  localityName: string,
  slugGender?: "male only" | "female only",
): string {
  const cityLabel = capitalizeFirstLetter(city.replace(/_/g, " "));
  if (slugGender === "male only") {
    return `Fully Furnished Boys PG in ${localityName}, ${cityLabel}`;
  }
  if (slugGender === "female only") {
    return `Safe & Fully Furnished Girls PG in ${localityName}, ${cityLabel}`;
  }
  return `PG in ${localityName}, ${cityLabel}`;
}

export function getColivingCityMarketingSeoOverride(srpSlugParam: string) {
  const cityKey = colivingCityKeyFromMarketingSlug(srpSlugParam);
  if (!cityKey) return null;
  const cityLabel = capitalizeFirstLetter(cityKey.replace(/_/g, " "));
  return {
    pageTitle: `Coliving in ${cityLabel} | Fully Furnished PG for Students & Working Professionals`,
    headerH1: `Fully Furnished Coliving in ${cityLabel} for Students and Working Professionals`,
  };
}

export function getKotaCityHostelsSeoOverride(srpSlugParam: string) {
  if (srpSlugParam !== "hostels-in-kota") return null;
  return {
    pageTitle:
      "Student Hostels in Kota | Boys & Girls Hostels Near Coaching Institutes",
    headerH1:
      "Best Student Hostels in Kota for Boys and Girls Near Coaching Institutes",
  };
}

export function getPropertiesListHeading(options: {
  total: number;
  city: string;
  localityName?: string;
  landmarkLabel?: string;
  slugGender?: "male only" | "female only";
  livingType: string;
  isLandmark?: boolean;
}): string {
  const cityLabel = capitalizeFirstLetter(options.city.replace(/_/g, " "));
  const count = options.total;
  if (options.isLandmark && options.landmarkLabel) {
    return `${count} Coliving PGs in near ${options.landmarkLabel}`;
  }
  if (options.localityName) {
    if (options.slugGender === "male only") {
      return `${count} Boys PG in ${options.localityName}, ${cityLabel}`;
    }
    if (options.slugGender === "female only") {
      return `${count} Girls PG in ${options.localityName}, ${cityLabel}`;
    }
    if (options.livingType === "hostels") {
      return `${count} Student Hostels in ${options.localityName}, ${cityLabel}`;
    }
    return `${count} Coliving PGs in ${options.localityName}, ${cityLabel}`;
  }
  if (options.slugGender === "male only") {
    return `${count} Gents PG in ${cityLabel}`;
  }
  if (options.slugGender === "female only") {
    return `${count} Ladies PG in ${cityLabel}`;
  }
  if (options.livingType === "hostels") {
    return `${count} Student Hostels in ${cityLabel}`;
  }
  return `${count} Coliving PGs in ${cityLabel}`;
}

export function formatStartingSubtitle(startingRent: number, propertyCount: number) {
  const rent = startingRent.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });
  const label = propertyCount === 1 ? "Property" : "Properties";
  return `Starting ${rent} | ${propertyCount} ${label}`;
}

export { formatInrInteger, localitySlugToName };
