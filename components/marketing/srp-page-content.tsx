"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeaderSearch } from "@/components/layout/site-header-search";
import { LocalityBentoHero } from "@/components/marketing/locality-bento-hero";
import { LocalityContactCard } from "@/components/marketing/locality-contact-card";
import {
  LocalityMobileActions,
} from "@/components/marketing/locality-mobile-actions";
import {
  LocalityMobileTabs,
  type LocalityMobileTab,
} from "@/components/marketing/locality-mobile-tabs";
import { SrpFaq } from "@/components/marketing/srp-faq";
import { SrpListingsSection } from "@/components/marketing/srp-listings-section";
import { PropertyActionsProvider } from "@/components/booking/property-actions-provider";
import { JsonLd } from "@/components/seo/json-ld";
import { mapPropertiesToSrpCards } from "@/src/lib/map-property";
import type { SrpPageConfig } from "@/src/lib/srp/resolve-srp-page";
import { resolveSrpHeroImageSrc } from "@/src/lib/srp/srp-hero-image";
import { useSrpFilters } from "@/src/lib/srp/use-srp-filters";
import { useSrpPagination } from "@/src/lib/srp/use-srp-pagination";
import { cn } from "@/src/lib/cn";
import { pageLayout } from "@/src/tokens/layout";

function SrpHero({
  config,
  heroImageSrc,
}: {
  config: SrpPageConfig;
  heroImageSrc?: string;
}) {
  const resolvedSrc = resolveSrpHeroImageSrc(config, heroImageSrc);

  return (
    <LocalityBentoHero
      title={config.pageTitle}
      subtitle={config.heroSubtitle}
      heroImageSrc={resolvedSrc}
      heroImageAlt={config.pageTitle}
    />
  );
}

function SrpAboutSection({ config }: { config: SrpPageConfig }) {
  return (
    <section aria-label="About" className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 md:text-[1.875rem] md:leading-[2.375rem]">
        {config.aboutTitle}
      </h2>
      <p className="text-base leading-7 text-gray-600">{config.aboutText}</p>
    </section>
  );
}

function RelatedLandmarkLinks({
  links,
}: {
  links: SrpPageConfig["relatedLandmarkLinks"];
}) {
  if (links.length === 0) return null;

  return (
    <section aria-label="Explore nearby landmarks" className="space-y-5">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 md:text-[1.875rem] md:leading-[2.375rem]">
        Explore nearby landmarks
      </h2>
      <ul className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
        {links.map((item) => (
          <li key={item.href} className="min-w-0">
            <Link
              href={item.href}
              className="block truncate text-sm font-medium text-gray-600 underline underline-offset-4 hover:text-gray-900"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function SrpPageContent({ config }: { config: SrpPageConfig }) {
  const [mobileTab, setMobileTab] = useState<LocalityMobileTab>("properties");
  const detailsRef = useRef<HTMLDivElement>(null);

  const paginationContext = useMemo(
    () => ({
      kind: config.kind,
      city: config.city,
      localitySlug: config.localitySlug,
      landmarkSlug: config.landmarkSlug,
      slugGender: config.slugGender,
    }),
    [
      config.kind,
      config.city,
      config.localitySlug,
      config.landmarkSlug,
      config.slugGender,
    ],
  );

  const { query, setQuery } = useSrpFilters();

  const {
    properties,
    total,
    isLoading,
    isRefreshing,
    sentinelRef,
  } = useSrpPagination(
    config.properties,
    config.total,
    paginationContext,
    config.canonicalPath,
    query,
  );

  const listingsHeading = useMemo(
    () => config.propertiesHeading.replace(/^\d+/, String(total)),
    [config.propertiesHeading, total],
  );

  const subtitleBuilder = (property: (typeof properties)[number]) => {
    if (config.kind === "landmark") {
      return `Coliving PG near ${config.localityName ?? config.city}`;
    }
    if (config.localityName) {
      return `Coliving PG in ${config.localityName}`;
    }
    return `Coliving PG in ${config.city}`;
  };

  const cardProperties = mapPropertiesToSrpCards(properties, subtitleBuilder, {
    city: config.city,
    locality: config.localityName ?? config.city,
  });

  function showDetails() {
    setMobileTab("details");
    detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <PropertyActionsProvider
      defaultCity={config.city}
      defaultLocation={config.localityName ?? config.city}
    >
    <div className={cn("bg-white", pageLayout.mobileStickyBottomPadding)}>
      <JsonLd schema={config.schema} />
      <SiteHeaderSearch />

      <main className={cn(pageLayout.container, "pt-0 lg:pt-8")}>
        <SrpHero config={config} />

        <div className="mt-8 md:mt-12">
          <LocalityMobileTabs
            value={mobileTab}
            onChange={setMobileTab}
            className="mb-6"
          />

          <div
            className={cn(
              mobileTab === "properties" ? "block" : "hidden md:block",
            )}
          >
            <SrpListingsSection
              heading={listingsHeading}
              properties={cardProperties}
              isLoadingMore={isLoading}
              isRefreshing={isRefreshing}
              loadMoreRef={sentinelRef}
              filterQuery={query}
              onFilterChange={setQuery}
              slugGender={config.slugGender}
            />
          </div>

          <div
            ref={detailsRef}
            className={cn(
              "mt-12 md:mt-16",
              mobileTab === "details" ? "block" : "hidden md:block",
            )}
          >
            <div className={pageLayout.twoColumn}>
              <div className={cn(pageLayout.mainColumn, "space-y-10 md:space-y-12")}>
                <SrpAboutSection config={config} />
                <RelatedLandmarkLinks links={config.relatedLandmarkLinks} />
              </div>
              <div className={pageLayout.sidebarColumn}>
                <LocalityContactCard sticky />
              </div>
            </div>
          </div>

          <div className="mt-12 md:hidden">
            <LocalityContactCard />
          </div>

          {!config.hideFaqSection ? (
            <div className="mt-12 md:mt-16">
              <SrpFaq items={config.faqs} />
            </div>
          ) : null}
        </div>
      </main>

      <SiteFooter />
      <LocalityMobileActions onShowDetails={showDetails} />
    </div>
    </PropertyActionsProvider>
  );
}
