import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  robots: { index: true, follow: true },
};

export default function BlogsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white">
      <SiteHeader variant="banner" />
      {children}
      <SiteFooter />
    </div>
  );
}
