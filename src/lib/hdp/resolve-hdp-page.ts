import {
  fetchProperty,
  fetchPropertyCategories,
  fetchSimilarProperties,
} from "@/src/apis/hdp";
import { getHdpPageTitle } from "@/src/lib/hdp-page-title";
import { buildHdpMetaDescription } from "@/src/lib/hdp/hdp-description";
import { buildHdpFaqs } from "@/src/lib/hdp/hdp-faqs";
import {
  mapGoogleDataToReviewSummary,
  mapGoogleReviewsToResidentReviews,
  mapNearByToNeighborhoodCards,
  mergeNearByAreas,
} from "@/src/lib/hdp/map-hdp-api";
import type { HdpPageView } from "@/src/lib/hdp/hdp-page-view";
import { imageUrlFormatter } from "@/src/lib/images";
import {
  colivingFlatLocalityPath,
  createHdpSlug,
  getLocalitySlug,
} from "@/src/lib/sitemap-slug";
import {
  getBreadcrumbSchema,
  getFAQPageSchema,
  getPlaceSchema,
  getPublicSiteUrl,
  getWebPageSchema,
  type HdpPageSchema,
} from "@/src/lib/schema";
import { capitalizeFirstLetter } from "@/src/lib/string-utils";
import type { CategoryProps } from "@/src/models/category";
import type {
  GoogleData,
  NearByArea,
  Property,
  SimilarProperty,
} from "@/src/models/property";
import type { HdpRoomType } from "@/src/tokens/hdp";

export type HdpBreadcrumbItem = { name: string; path?: string };

export type HdpPageConfig = {
  canonicalPath: string;
  srpSlug: string;
  localitySlug: string;
  hdpSlug: string;
  property: Property;
  propertyId: number;
  pageTitle: string;
  headerH1: string;
  pageMetaDescription: string;
  breadcrumbItems: HdpBreadcrumbItem[];
  faqs: { question: string; answer: string }[];
  schema: HdpPageSchema;
  view: HdpPageView;
  googleData: GoogleData | null;
  nearBy: NearByArea | null;
  categories: CategoryProps[];
  similarProperties: SimilarProperty[];
};

function genderBadge(gender?: string): string | undefined {
  switch (String(gender || "").toUpperCase()) {
    case "MALE":
      return "Men Only";
    case "FEMALE":
      return "Women Only";
    case "ALL":
      return undefined;
    default:
      return undefined;
  }
}

function localityDisplayName(localitySlug: string): string {
  return localitySlug
    .replace(/-/g, " ")
    .replace(/_/g, " ")
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function localityBreadcrumbPath(
  srpSlug: string,
  localitySlug: string,
  city: string,
): string {
  if (srpSlug.startsWith("coliving-in-")) {
    const flat = colivingFlatLocalityPath(city, localitySlug);
    if (flat) return flat.replace(/^\//, "");
  }
  return `${srpSlug}/${localitySlug}`;
}

function mapCategoriesToRoomTypes(categories: CategoryProps[]): HdpRoomType[] {
  return categories
    .filter((category) => category.show_to_ui && !category.is_removed)
    .map((category) => ({
      id: String(category.id),
      name: category.display_name || category.name,
      rent: category.rent ?? category.private_rent ?? 0,
      features: category.key_feature?.length
        ? category.key_feature
        : category.amenities?.slice(0, 3) ?? [],
    }));
}

function propertyGalleryImages(property: Property): readonly string[] {
  const primary = property.hdp_image || property.image || property.srp_image;
  const gallery = Array.isArray(property.property_image)
    ? property.property_image
    : [];
  const urls = [primary, ...gallery]
    .filter(Boolean)
    .map((url) => imageUrlFormatter("hdp", String(url)));
  return urls.length > 0 ? urls : ["/assets/community/hero/hero-1.png"];
}

function buildHdpView(options: {
  property: Property;
  pageTitle: string;
  canonicalPath: string;
  categories: CategoryProps[];
  googleData: GoogleData | null;
  nearBy: NearByArea | null;
  localitySlug: string;
}): HdpPageView {
  const {
    property,
    pageTitle,
    canonicalPath,
    categories,
    googleData,
    nearBy,
    localitySlug,
  } = options;
  const displayName = property.display_name || property.name;
  const reviewCount =
    googleData?.google_reviews_new?.length ??
    googleData?.google_reviews?.length ??
    0;
  const rating = Number(googleData?.google_rating ?? 4.5);
  const depositMonths = property.security_deposit_months ?? property.sd_month ?? 1;
  const locality =
    property.locality ||
    property.address?.line2 ||
    localityDisplayName(localitySlug);

  const reviewSummary = mapGoogleDataToReviewSummary(googleData);
  const residentReviews = mapGoogleReviewsToResidentReviews(googleData);
  const mapUrl = property.map_url || undefined;

  return {
    propertyId: property.id,
    pageTitle,
    displayName,
    name: property.name,
    badge: genderBadge(property.gender),
    locality,
    addressLine: property.address?.line1,
    mapUrl,
    startingRent: property.min_rent ?? 0,
    securityDepositMonths: depositMonths,
    securityDepositLabel: `${depositMonths} month${depositMonths === 1 ? "" : "s"} rent`,
    minStayMonths: property.lockin_period ?? 3,
    rating: Number.isFinite(rating) ? rating : 4.5,
    reviewCount,
    visitsToday: undefined,
    trendingLabel: property.lightning_deal ? "Trending" : undefined,
    topChoiceCopy: property.address?.city
      ? `is the top choice in ${capitalizeFirstLetter(property.address.city.replace(/_/g, " "))}.`
      : undefined,
    about: property.description || property.nearby_description || "",
    amenities: [
      ...(property.amenities ?? []),
      ...(property.rent_includes ?? []),
      ...(property.services ?? []),
    ].filter((item) => item && item !== "None"),
    galleryImages: propertyGalleryImages(property),
    propertyUrl: `${getPublicSiteUrl()}/${canonicalPath}`,
    soldOut: Boolean(property.sold_out),
    gstPercent: property.gst_percent || undefined,
    roomTypes: mapCategoriesToRoomTypes(categories),
    nearbyItems: mapNearByToNeighborhoodCards(nearBy, mapUrl),
    reviewSummary,
    residentReviews,
    googleLink: googleData?.google_link || undefined,
    nearbyDescription: property.nearby_description || undefined,
  };
}

export async function resolveHdpPage(
  srpSlug: string,
  localitySlug: string,
  hdpSlug: string,
): Promise<HdpPageConfig | null> {
  const normalizedSrp = String(srpSlug || "").trim().toLowerCase();
  const normalizedLocality = String(localitySlug || "")
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, "-");
  const normalizedHdp = String(hdpSlug || "").trim().toLowerCase();
  if (!normalizedSrp || !normalizedLocality || !normalizedHdp) return null;

  const response = await fetchProperty(normalizedHdp);
  if (!response?.success || !response?.data?.id) return null;

  let property = response.data as Property;
  if (property.services && property.rent_includes) {
    property = {
      ...property,
      rent_includes: [...property.rent_includes, ...property.services],
    };
  }

  const propertyId = Number(property.id);
  const [categoriesResponse, similarResponse] = await Promise.all([
    fetchPropertyCategories(propertyId),
    fetchSimilarProperties(propertyId),
  ]);

  const categories = (categoriesResponse?.data ?? []) as CategoryProps[];
  const similarProperties = (similarResponse?.data ?? []) as SimilarProperty[];
  const googleData = (response.googleData ?? null) as GoogleData | null;
  const nearBy = mergeNearByAreas(
    response.nearBy as NearByArea | null,
    googleData?.data ?? null,
  );

  const canonicalPath = `${normalizedSrp}/${normalizedLocality}/${normalizedHdp}`;
  const pageTitle = getHdpPageTitle(property, normalizedSrp);
  const pageMetaDescription = buildHdpMetaDescription(
    property,
    googleData,
    canonicalPath,
  );
  const faqs = buildHdpFaqs(property, googleData, categories, nearBy);

  const city = property.address?.city || property.city || "";
  const localityName = localityDisplayName(normalizedLocality);
  const srpLabel = capitalizeFirstLetter(normalizedSrp.split("-").join(" "));
  const breadcrumbItems: HdpBreadcrumbItem[] = [
    { name: "Home", path: "" },
    { name: srpLabel, path: normalizedSrp },
    {
      name: localityName,
      path: localityBreadcrumbPath(normalizedSrp, normalizedLocality, city),
    },
    { name: property.display_name || property.name, path: canonicalPath },
  ];

  const baseUrl = getPublicSiteUrl();
  const fullUrl = `${baseUrl}/${canonicalPath}`;
  const placeImage = property.hdp_image
    ? imageUrlFormatter("hdp", property.hdp_image)
    : undefined;
  const propertyImageUrls = (property.property_image ?? [])
    .map((url) => imageUrlFormatter("hdp", url))
    .filter(Boolean);
  const ratingValue = googleData?.google_rating;
  const hasValidRating =
    ratingValue != null && !Number.isNaN(Number(ratingValue));
  const reviewCount =
    googleData?.google_reviews_new?.length ??
    googleData?.google_reviews?.length ??
    0;

  const schema: HdpPageSchema = {
    webPage: getWebPageSchema({
      baseUrl,
      path: canonicalPath,
      name: pageTitle,
      description: pageMetaDescription,
      fullUrl,
    }),
    breadcrumb: getBreadcrumbSchema(baseUrl, breadcrumbItems),
    ...(property.display_name || property.name
      ? {
          place: getPlaceSchema({
            name: property.display_name || property.name,
            description: pageMetaDescription,
            pageUrl: fullUrl,
            imageUrl: placeImage,
            imageUrls: propertyImageUrls,
            address: property.address,
            amenities: property.amenities,
            rentIncludes: property.rent_includes,
            minRent: property.min_rent,
            ...(hasValidRating
              ? {
                  aggregateRating: {
                    ratingValue: Number(ratingValue),
                    reviewCount: reviewCount || 1,
                  },
                }
              : {}),
          }),
        }
      : {}),
    ...(faqs.length > 0 ? { faqPage: getFAQPageSchema(faqs) } : {}),
  };

  const view = buildHdpView({
    property,
    pageTitle,
    canonicalPath,
    categories,
    googleData,
    nearBy,
    localitySlug: normalizedLocality,
  });

  return {
    canonicalPath,
    srpSlug: normalizedSrp,
    localitySlug: normalizedLocality,
    hdpSlug: normalizedHdp,
    property,
    propertyId,
    pageTitle,
    headerH1: pageTitle,
    pageMetaDescription,
    breadcrumbItems,
    faqs,
    schema,
    view,
    googleData,
    nearBy,
    categories,
    similarProperties,
  };
}

export function buildHdpStaticParamsFromProperties(
  properties: Property[],
): { srp_slug: string; locality: string; hdp_slug: string }[] {
  const paths: { srp_slug: string; locality: string; hdp_slug: string }[] = [];
  const seen = new Set<string>();

  for (const property of properties) {
    const city = property.address?.city || property.city;
    if (!city) continue;
    const locality =
      getLocalitySlug(property) ||
      String(property.locality || "")
        .trim()
        .toLowerCase()
        .replace(/[_\s]+/g, "-");
    if (!locality) continue;
    const hdpSlug = createHdpSlug(property);
    const srpSlugValue = city.toLowerCase() === "kota" ? "hostels-in-kota" : `coliving-in-${city.toLowerCase()}`;
    const key = `${srpSlugValue}/${locality}/${hdpSlug}`;
    if (seen.has(key)) continue;
    seen.add(key);
    paths.push({ srp_slug: srpSlugValue, locality, hdp_slug: hdpSlug });
  }

  return paths;
}
