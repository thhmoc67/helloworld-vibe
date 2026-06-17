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
import { PropertyGalleryFromImages } from "@/components/marketing/property-gallery-from-images";
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
            <PropertyGalleryFromImages
              images={view.galleryImages}
              alt={view.displayName}
            />
          </div>

          <div className={cn("mt-8 md:mt-10", pageLayout.twoColumn)}>
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

            <div
              className={cn(
                pageLayout.sidebarColumn,
                "md:sticky md:top-18 md:z-20 md:max-h-[calc(100vh-4.5rem)] md:overflow-y-auto",
              )}
            >
              <HdpBookingCard view={view} />
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
