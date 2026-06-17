/**
 * JSON-LD schema.org structured data builders for SRP pages.
 */

const SITE_NAME = "HelloWorld Coliving & Student Hostels";
const DEFAULT_DESCRIPTION =
  "HelloWorld provides coliving, student housing, coworking, social spaces and natural habitats to those exploring the evolution of humanity through positive impact.";

export interface WebPageSchema {
  "@context": "https://schema.org";
  "@type": "WebPage";
  url: string;
  name: string;
  description?: string;
  isPartOf?: { "@id": string };
}

export interface BreadcrumbSchema {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: {
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }[];
}

export interface FAQPageSchema {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: {
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }[];
}

export interface ItemListSchema {
  "@context": "https://schema.org";
  "@type": "ItemList";
  name: string;
  description?: string;
  numberOfItems: number;
  itemListElement: {
    "@type": "ListItem";
    position: number;
    name: string;
    url: string;
  }[];
  url?: string;
}

export interface SrpPageSchema {
  webPage: WebPageSchema;
  breadcrumb: BreadcrumbSchema;
  itemList: ItemListSchema;
  faqPage?: FAQPageSchema;
}

export interface PlaceSchema {
  "@context": "https://schema.org";
  "@type": "LodgingBusiness";
  name: string;
  description?: string;
  url?: string;
  image?: string | string[];
  address?: {
    "@type": "PostalAddress";
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  amenityFeature?: { "@type": "LocationFeatureSpecification"; name: string }[];
  priceRange?: string;
  aggregateRating?: {
    "@type": "AggregateRating";
    ratingValue: number;
    reviewCount: number;
    bestRating: number;
  };
}

export interface HdpPageSchema {
  webPage: WebPageSchema;
  breadcrumb: BreadcrumbSchema;
  place?: PlaceSchema;
  faqPage?: FAQPageSchema;
}

export function getPublicSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL?.trim();
  if (vercelUrl) return `https://${vercelUrl}`.replace(/\/$/, "");
  return "https://thehelloworld.com";
}

export function getWebPageSchema(options: {
  baseUrl: string;
  path?: string;
  name?: string;
  description?: string;
  fullUrl?: string;
}): WebPageSchema {
  const { baseUrl, path = "", name, description, fullUrl } = options;
  const url =
    fullUrl ||
    (path
      ? `${baseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`
      : baseUrl);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url,
    name: name || SITE_NAME,
    description: description || DEFAULT_DESCRIPTION,
    isPartOf: {
      "@id": `${baseUrl.replace(/\/$/, "")}/#website`,
    },
  };
}

export function getBreadcrumbSchema(
  baseUrl: string,
  items: { name: string; path?: string }[],
): BreadcrumbSchema {
  const base = baseUrl.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items
      .filter((item) => Boolean(item?.name?.trim()))
      .map((item, index) => {
        const path = item.path?.trim();
        const itemUrl =
          path && path.length > 0
            ? `${base}/${path.replace(/^\//, "")}`
            : base;
        return {
          "@type": "ListItem" as const,
          position: index + 1,
          name: item.name,
          item: itemUrl,
        };
      }),
  };
}

export function getItemListSchema(options: {
  baseUrl: string;
  listName: string;
  listDescription?: string;
  numberOfItems: number;
  items: { name: string; url: string }[];
  pageUrl: string;
}): ItemListSchema {
  const base = options.baseUrl.replace(/\/$/, "");
  const normalizedItems = options.items.filter(
    (item) => Boolean(item?.name?.trim()) && Boolean(item?.url?.trim()),
  );
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: options.listName,
    ...(options.listDescription ? { description: options.listDescription } : {}),
    numberOfItems: options.numberOfItems,
    url: options.pageUrl,
    itemListElement: normalizedItems.slice(0, 20).map((item, index) => ({
      "@type": "ListItem" as const,
      position: index + 1,
      name: item.name,
      url: item.url.startsWith("http")
        ? encodeURI(item.url)
        : encodeURI(`${base}/${item.url.replace(/^\//, "")}`),
    })),
  };
}

export function getFAQPageSchema(
  questions: { question: string; answer: string }[],
): FAQPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions
      .filter((q) => Boolean(q?.question?.trim()) && Boolean(q?.answer?.trim()))
      .map((q) => ({
        "@type": "Question" as const,
        name: q.question,
        acceptedAnswer: {
          "@type": "Answer" as const,
          text: q.answer,
        },
      })),
  };
}

export function getPlaceSchema(options: {
  name: string;
  description?: string;
  pageUrl: string;
  imageUrl?: string;
  imageUrls?: string[];
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    pincode?: string | number;
    country?: string;
  };
  amenities?: string[];
  rentIncludes?: string[];
  minRent?: number;
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
    bestRating?: number;
  };
}): PlaceSchema {
  const images = [
    ...(options.imageUrl ? [options.imageUrl] : []),
    ...(options.imageUrls ?? []),
  ].filter(Boolean);

  const amenityNames = Array.from(
    new Set([...(options.amenities ?? []), ...(options.rentIncludes ?? [])]),
  )
    .filter(Boolean)
    .slice(0, 20);

  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: options.name,
    ...(options.description ? { description: options.description } : {}),
    url: options.pageUrl,
    ...(images.length ? { image: images.length === 1 ? images[0] : images } : {}),
    ...(options.address
      ? {
          address: {
            "@type": "PostalAddress",
            ...(options.address.line1
              ? { streetAddress: options.address.line1 }
              : {}),
            ...(options.address.line2 || options.address.city
              ? {
                  addressLocality:
                    options.address.line2 || options.address.city,
                }
              : {}),
            ...(options.address.state
              ? { addressRegion: options.address.state }
              : {}),
            ...(options.address.pincode
              ? { postalCode: String(options.address.pincode) }
              : {}),
            ...(options.address.country
              ? { addressCountry: options.address.country }
              : {}),
          },
        }
      : {}),
    ...(amenityNames.length
      ? {
          amenityFeature: amenityNames.map((name) => ({
            "@type": "LocationFeatureSpecification" as const,
            name,
          })),
        }
      : {}),
    ...(options.minRent != null && options.minRent > 0
      ? { priceRange: `₹${options.minRent}+` }
      : {}),
    ...(options.aggregateRating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: options.aggregateRating.ratingValue,
            reviewCount: options.aggregateRating.reviewCount,
            bestRating: options.aggregateRating.bestRating ?? 5,
          },
        }
      : {}),
  };
}
