import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
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
import { hdpProperty } from "@/src/tokens/hdp";
import { pageLayout } from "@/src/tokens/layout";
import { cn } from "@/src/lib/cn";

export const metadata: Metadata = {
  title: `${hdpProperty.name} — HelloWorld Coliving PG in Electronic City`,
  description:
    "Book a free visit at Helloworld Park Square — coliving PG in Electronic City, Bengaluru with amenities, vibe match, and room categories.",
};

export default function HdpPage() {
  return (
    <div className={cn("bg-white", pageLayout.mobileStickyBottomPadding)}>
      <SiteHeader />
      <main className={pageLayout.containerWithTopPadding}>
        <HdpHeader />

        <div className="mt-4 md:mt-6">
          <div className="hidden md:block">
            <PropertyGalleryDesktop />
          </div>
          <div className="md:hidden">
            <PropertyGalleryMobile />
          </div>
        </div>

        <div className={cn("mt-8 md:mt-10", pageLayout.twoColumn)}>
          <div className={pageLayout.mainColumn}>
            <div className="space-y-6">
              <HdpRatingCard />
              <HdpVibeMatch />
            </div>

            <HdpSectionNav className="mt-6" />

            <div className="mt-8 space-y-10 md:mt-10 md:space-y-12">
              <HdpAbout />
              <HdpAmenities />
              <HdpNearbyPlaces />
              <section id="hdp-reviews" className="scroll-mt-32">
                <HdpReviews />
              </section>
            </div>
          </div>

          <div className={pageLayout.sidebarColumn}>
            <HdpBookingCard sticky />
          </div>
        </div>

        <div className="mt-12 space-y-12 md:mt-16 md:space-y-16">
          <HdpSimilarProperties />
          <HdpFaq />
        </div>
      </main>
      <SiteFooter />
      <HdpMobileActions />
    </div>
  );
}
