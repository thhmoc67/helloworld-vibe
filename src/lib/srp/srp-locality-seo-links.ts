import PRESENT_CITIES from "@/src/constants/cities";
import {
  colivingCityKeyFromMarketingSlug,
} from "@/src/lib/srp/srp-seo";
import {
  parseFlatColivingLocalitySlug,
  parseFlatRoomForRentLocalitySlug,
  parseFlatKotaGenderHostelSlug,
  parseFlatKotaGenericHostelSlug,
} from "@/src/lib/srp-slug-parse";
import { isKotaCity, srpSlug, genderedHostelsSrpSlug } from "@/src/lib/sitemap-slug";
import type { SrpPageConfig } from "@/src/lib/srp/resolve-srp-page";
import { capitalizeFirstLetter } from "@/src/lib/string-utils";

export function roomForRentBrowseCityKeyFromSrpPath(
  srpPath: string,
): string | null {
  const flat = parseFlatRoomForRentLocalitySlug(srpPath, PRESENT_CITIES);
  return flat?.city ?? null;
}

export function colivingBrowseCityKeyFromSrpPath(
  srpPath: string,
): string | null {
  const fromCity = colivingCityKeyFromMarketingSlug(srpPath);
  if (fromCity) return fromCity;
  const flat = parseFlatColivingLocalitySlug(srpPath, PRESENT_CITIES);
  return flat?.city ?? null;
}

export type SrpLocalitySeoLinkFlags = {
  kotaHostelLocalityTripleLinks: boolean;
  kotaSingularHostelFlatLinks: boolean;
  genderFlatCityKey?: string;
  genderFlatLinkVariant?: "boys" | "girls";
  colivingLocalityQuadLinks: boolean;
  pgLocalityWithRoomLinks: boolean;
  genderLocalityWithRoomLinks: boolean;
  colivingStyleCityKey: string | null;
  pgBrowseCityKey: string | null;
  localityLinkPrefix: string;
  kotaCityLabel: string;
};

export function resolveSrpLocalitySeoLinkFlags(
  config: Pick<
    SrpPageConfig,
    "canonicalPath" | "city" | "livingType" | "slugGender"
  >,
): SrpLocalitySeoLinkFlags {
  const srpPath = config.canonicalPath;
  const city = config.city;
  const { livingType, slugGender } = config;

  const isColivingFamily = srpPath.startsWith("coliving-in-");
  const isRoomForRentFamily = srpPath.startsWith("room-for-rent-in-");

  const kotaHostelLocalityTripleLinks =
    isKotaCity(city) && livingType === "hostels";

  const kotaSingularHostelFlatLinks =
    Boolean(parseFlatKotaGenderHostelSlug(srpPath)) ||
    Boolean(parseFlatKotaGenericHostelSlug(srpPath));

  const genderFlatLinkVariant = srpPath.startsWith("pg-for-boys-in-")
    ? ("boys" as const)
    : srpPath.startsWith("pg-for-girls-in-")
      ? ("girls" as const)
      : undefined;

  const genderFlatCityKey = genderFlatLinkVariant
    ? String(city).toLowerCase()
    : undefined;

  const colivingBrowseCityKey = colivingBrowseCityKeyFromSrpPath(srpPath);
  const roomForRentBrowseCityKey = roomForRentBrowseCityKeyFromSrpPath(srpPath);
  const colivingStyleCityKey =
    colivingBrowseCityKey ?? roomForRentBrowseCityKey ?? null;

  const pgBrowseCityKey =
    srpPath.startsWith("pg-in-") && city ? String(city).toLowerCase() : null;

  const colivingLocalityQuadLinks =
    Boolean(colivingStyleCityKey) &&
    !kotaHostelLocalityTripleLinks &&
    (isColivingFamily || isRoomForRentFamily) &&
    Boolean(city) &&
    !isKotaCity(city);

  const pgLocalityWithRoomLinks =
    Boolean(pgBrowseCityKey) &&
    !kotaHostelLocalityTripleLinks &&
    !colivingLocalityQuadLinks &&
    Boolean(city) &&
    !isKotaCity(city);

  const genderLocalityWithRoomLinks =
    Boolean(genderFlatCityKey && genderFlatLinkVariant) &&
    !kotaHostelLocalityTripleLinks &&
    !colivingLocalityQuadLinks &&
    !pgLocalityWithRoomLinks &&
    Boolean(city) &&
    !isKotaCity(city);

  const localityLinkPrefix =
    livingType === "hostels"
      ? slugGender === "male only"
        ? "Boys hostels in"
        : slugGender === "female only"
          ? "Girls hostels in"
          : "Hostels in"
      : slugGender === "male only"
        ? "Gents PG in"
        : slugGender === "female only"
          ? "Ladies PG in"
          : isColivingFamily
            ? "Coliving PG in"
            : isRoomForRentFamily
              ? "Room for rent in"
              : "PG in";

  const kotaCityLabel = isKotaCity(city)
    ? capitalizeFirstLetter(city.replace(/_/g, " "))
    : "";

  return {
    kotaHostelLocalityTripleLinks,
    kotaSingularHostelFlatLinks,
    genderFlatCityKey,
    genderFlatLinkVariant,
    colivingLocalityQuadLinks,
    pgLocalityWithRoomLinks,
    genderLocalityWithRoomLinks,
    colivingStyleCityKey,
    pgBrowseCityKey,
    localityLinkPrefix,
    kotaCityLabel,
  };
}

export function shouldShowSrpLocalitySeoLinks(
  config: Pick<SrpPageConfig, "kind" | "canonicalPath" | "localityLinks">,
): boolean {
  return (
    config.kind !== "landmark" &&
    Boolean(config.canonicalPath) &&
    config.localityLinks.length > 0
  );
}

export function kotaCityHostelSeoLinks(city: string) {
  const cityLabel = capitalizeFirstLetter(city.replace(/_/g, " "));
  return [
    {
      href: `/${srpSlug(city)}`,
      label: `Student hostels in ${cityLabel}`,
    },
    {
      href: `/${genderedHostelsSrpSlug(city, "boys")}`,
      label: `Boys hostels in ${cityLabel}`,
    },
    {
      href: `/${genderedHostelsSrpSlug(city, "girls")}`,
      label: `Girls hostels in ${cityLabel}`,
    },
  ] as const;
}
