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
