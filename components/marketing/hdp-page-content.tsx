"use client";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PropertyActionsProvider } from "@/components/booking/property-actions-provider";
import { HdpAbout } from "@/components/marketing/hdp-about";
import { HdpAmenities } from "@/components/marketing/hdp-amenities";
import { HdpBookingCard } from "@/components/marketing/hdp-booking-card";
import { HdpFaq } from "@/components/marketing/hdp-faq";
import { HdpHeader } from "@/components/marketing/hdp-header";
import { HdpMobileActions } from "@/components/marketing/hdp-mobile-actions";
import { HdpNearbyPlaces } from "@/components/marketing/hdp-nearby-places";
import { HdpRatingCard } from "@/components/marketing/hdp-rating-card";
import { HdpSectionNav } from "@/components/marketing/hdp-section-nav";
import { HdpSimilarProperties } from "@/components/marketing/hdp-similar-properties";
import { HdpVibeMatch } from "@/components/marketing/hdp-vibe-match";
import { HdpReviews } from "@/components/marketing/hdp-reviews";
import {
  PropertyGalleryDesktop,
  PropertyGalleryMobile,
} from "@/components/marketing/property-gallery";
import { JsonLd } from "@/components/seo/json-ld";
import type { HdpPageConfig } from "@/src/lib/hdp/resolve-hdp-page";
import { cn } from "@/src/lib/cn";
import { pageLayout } from "@/src/tokens/layout";

export function HdpPageContent({ config }: { config: HdpPageConfig }) {
  const { view } = config;
  const city =
    config.property.address?.city?.replace(/_/g, " ") ||
    config.property.city?.replace(/_/g, " ") ||
    undefined;
  const locality =
    config.property.locality ||
    config.property.address?.line2 ||
    config.localitySlug.replace(/-/g, " ");

  return (
    <PropertyActionsProvider defaultCity={city} defaultLocation={locality}>
      <div className={cn("bg-white", pageLayout.mobileStickyBottomPadding)}>
        <JsonLd schema={config.schema} />
        <SiteHeader />

        <main className={pageLayout.containerWithTopPadding}>
          <HdpHeader view={view} />

          <div className="mt-4 md:mt-6">
            <div className="hidden md:block">
              <PropertyGalleryDesktop images={view.galleryImages} />
            </div>
            <div className="md:hidden">
              <PropertyGalleryMobile images={view.galleryImages} />
            </div>
          </div>

          <div className={pageLayout.hdpTwoColumn}>
            <div className={pageLayout.mainColumn}>
              <div className="space-y-6">
                <HdpRatingCard view={view} />
                <HdpVibeMatch displayName={view.displayName} />
              </div>

              <HdpSectionNav className="mt-6" />

              <div className="mt-8 space-y-10 md:mt-10 md:space-y-12">
                <HdpAbout view={view} />
                <HdpAmenities amenities={view.amenities} />
                <HdpNearbyPlaces
                  items={view.nearbyItems}
                  mapUrl={view.mapUrl}
                  subtitle={view.nearbyDescription}
                />
                <section id="hdp-reviews" className="scroll-mt-32">
                  <HdpReviews
                    reviewSummary={view.reviewSummary}
                    residentReviews={view.residentReviews}
                    googleLink={view.googleLink}
                  />
                </section>
              </div>
            </div>

            <div className={pageLayout.hdpSidebarColumn}>
              <div className="sticky top-24 z-20 w-full">
                <HdpBookingCard view={view} categories={config.categories} />
              </div>
            </div>
          </div>

          <div className="mt-12 space-y-12 md:mt-16 md:space-y-16">
            <HdpSimilarProperties
              properties={config.similarProperties}
              srpSlug={config.srpSlug}
              localitySlug={config.localitySlug}
            />
            <HdpFaq items={config.faqs} />
          </div>
        </main>

        <SiteFooter />
        <HdpMobileActions view={view} />
      </div>
    </PropertyActionsProvider>
  );
}
