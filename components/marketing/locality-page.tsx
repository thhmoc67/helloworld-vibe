"use client";

import { useRef, useState } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeaderSearch } from "@/components/layout/site-header-search";
import { LocalityContactCard } from "@/components/marketing/locality-contact-card";
import { LocalityDetailsPanel } from "@/components/marketing/locality-details-panel";
import { LocalityFaq } from "@/components/marketing/locality-faq";
import { LocalityHero } from "@/components/marketing/locality-hero";
import {
  LocalityMobileActions,
} from "@/components/marketing/locality-mobile-actions";
import {
  LocalityMobileTabs,
  type LocalityMobileTab,
} from "@/components/marketing/locality-mobile-tabs";
import { LocalityProperties } from "@/components/marketing/locality-properties";
import { cn } from "@/src/lib/cn";

export function LocalityPageContent() {
  const [mobileTab, setMobileTab] = useState<LocalityMobileTab>("properties");
  const detailsRef = useRef<HTMLDivElement>(null);

  function showDetails() {
    setMobileTab("details");
    detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="bg-white pb-24 lg:pb-0">
      <SiteHeaderSearch />

      <main className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 md:pt-8">
        <LocalityHero />

        <div className="mt-8 lg:mt-12">
          <LocalityMobileTabs
            value={mobileTab}
            onChange={setMobileTab}
            className="mb-6"
          />

          <div
            className={cn(
              mobileTab === "properties" ? "block" : "hidden lg:block",
            )}
          >
            <LocalityProperties />
          </div>

          <div
            ref={detailsRef}
            className={cn(
              "mt-12 lg:mt-16",
              mobileTab === "details" ? "block" : "hidden lg:block",
            )}
          >
            <div className="lg:flex lg:items-start lg:gap-8 xl:gap-10">
              <div className="min-w-0 lg:max-w-[58%]">
                <LocalityDetailsPanel />
              </div>
              <div className="hidden lg:block lg:w-[35%] lg:shrink-0">
                <LocalityContactCard sticky />
              </div>
            </div>
          </div>

          <div className="mt-12 lg:hidden">
            <LocalityContactCard />
          </div>

          <div className="mt-12 md:mt-16">
            <LocalityFaq />
          </div>
        </div>
      </main>

      <SiteFooter />
      <LocalityMobileActions onShowDetails={showDetails} />
    </div>
  );
}
