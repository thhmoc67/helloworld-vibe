"use client";

import { useEffect, useState } from "react";
import { TabNav } from "@/components/ui/tab-nav";
import { PrivacyPolicySections } from "@/components/marketing/privacy-policy/privacy-policy-sections";
import { TenantPolicySidebarButton } from "@/components/marketing/tenant-policy/tenant-policy-primitives";
import {
  privacyPolicyNavItems,
  type PrivacyPolicySectionId,
} from "@/src/constants/privacy-policy";
import { cn } from "@/src/lib/cn";
import { pageLayout } from "@/src/tokens/layout";

function scrollToPrivacyPolicySection(id: PrivacyPolicySectionId) {
  document.getElementById(`privacy-policy-${id}`)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export function PrivacyPolicyContent() {
  const [activeSection, setActiveSection] =
    useState<PrivacyPolicySectionId>("applicability");

  useEffect(() => {
    const sections = privacyPolicyNavItems
      .map((item) => document.getElementById(`privacy-policy-${item.id}`))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          const id = visible.target.id.replace(
            "privacy-policy-",
            "",
          ) as PrivacyPolicySectionId;
          setActiveSection(id);
        }
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function handleSectionChange(id: PrivacyPolicySectionId) {
    scrollToPrivacyPolicySection(id);
    setActiveSection(id);
  }

  return (
    <div className="bg-gray-50">
      <div className="sticky top-[4.5rem] z-30 border-b border-gray-200 bg-white/95 backdrop-blur-sm lg:hidden">
        <TabNav
          items={privacyPolicyNavItems}
          value={activeSection}
          onChange={handleSectionChange}
          heading=""
          aria-label="Privacy policy sections"
          className="px-4"
        />
      </div>

      <div className={cn(pageLayout.container, "py-8 md:py-12")}>
        <div className="lg:flex lg:items-start lg:gap-8 xl:gap-12">
          <aside className="sticky top-28 hidden w-[20.5rem] shrink-0 lg:block">
            <nav
              aria-label="Privacy policy sections"
              className="rounded-2xl border border-gray-200 bg-white px-6 py-8"
            >
              <div className="flex flex-col gap-2">
                {privacyPolicyNavItems.map((item) => (
                  <TenantPolicySidebarButton
                    key={item.id}
                    label={item.label}
                    active={activeSection === item.id}
                    onClick={() => handleSectionChange(item.id)}
                  />
                ))}
              </div>
            </nav>
          </aside>

          <div className="min-w-0 flex-1">
            <PrivacyPolicySections />
          </div>
        </div>
      </div>
    </div>
  );
}
