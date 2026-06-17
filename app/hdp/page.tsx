import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HdpPageContent } from "@/components/marketing/hdp-page-content";
import { resolveHdpPage } from "@/src/lib/hdp/resolve-hdp-page";
import { getPublicSiteUrl } from "@/src/lib/schema";

const DEMO_SRP = "coliving-in-bangalore";
const DEMO_LOCALITY = "electronic-city";
const DEMO_HDP = "helloworld-park-square";

export async function generateMetadata(): Promise<Metadata> {
  const config = await resolveHdpPage(DEMO_SRP, DEMO_LOCALITY, DEMO_HDP);
  if (!config) {
    return {
      title: "HelloWorld Property",
      description: "Book a free visit at HelloWorld coliving PG.",
    };
  }

  const baseUrl = getPublicSiteUrl();
  return {
    title: config.pageTitle,
    description: config.pageMetaDescription,
    alternates: {
      canonical: `${baseUrl}/${config.canonicalPath}`,
    },
  };
}

export default async function HdpDemoPage() {
  const config = await resolveHdpPage(DEMO_SRP, DEMO_LOCALITY, DEMO_HDP);
  if (!config) notFound();
  return <HdpPageContent config={config} />;
}
