"use client";

import { useEffect, useState } from "react";
import { TabNav } from "@/components/ui/tab-nav";
import { TenantPolicySidebarButton } from "@/components/marketing/tenant-policy/tenant-policy-primitives";
import { TenantPolicySections } from "@/components/marketing/tenant-policy/tenant-policy-sections";
import {
  tenantPolicyDisclaimer,
  tenantPolicyNavItems,
  type TenantPolicySectionId,
} from "@/src/constants/tenant-policy";
import { cn } from "@/src/lib/cn";
import { pageLayout } from "@/src/tokens/layout";

function scrollToTenantPolicySection(id: TenantPolicySectionId) {
  document.getElementById(`tenant-policy-${id}`)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export function TenantPolicyContent() {
  const [activeSection, setActiveSection] =
    useState<TenantPolicySectionId>("booking");

  useEffect(() => {
    const sections = tenantPolicyNavItems
      .map((item) => document.getElementById(`tenant-policy-${item.id}`))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          const id = visible.target.id.replace(
            "tenant-policy-",
            "",
          ) as TenantPolicySectionId;
          setActiveSection(id);
        }
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function handleSectionChange(id: TenantPolicySectionId) {
    scrollToTenantPolicySection(id);
    setActiveSection(id);
  }

  return (
    <div className="bg-gray-50">
      <div
        className={cn(
          "sticky top-[4.5rem] z-30 border-b border-gray-200 bg-white/95 backdrop-blur-sm lg:hidden",
        )}
      >
        <TabNav
          items={tenantPolicyNavItems}
          value={activeSection}
          onChange={handleSectionChange}
          heading=""
          aria-label="Tenancy policy sections"
          className="px-4"
        />
      </div>

      <div className={cn(pageLayout.container, "py-8 md:py-12")}>
        <div className="lg:flex lg:items-start lg:gap-8 xl:gap-12">
          <aside className="hidden w-[20.5rem] shrink-0 lg:block sticky top-28">
            <nav
              aria-label="Tenancy policy sections"
              className="sticky top-28 rounded-2xl border border-gray-200 bg-white px-6 py-8"
            >
              <div className="flex flex-col gap-2">
                {tenantPolicyNavItems.map((item) => (
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
            <TenantPolicySections />
            <p className="mt-12 text-sm leading-6 text-gray-600 md:mt-16">
              {tenantPolicyDisclaimer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
