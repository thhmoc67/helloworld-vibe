import { FaqAccordion } from "@/components/ui/faq-accordion";
import { getTenantPolicyFaqs } from "@/src/constants/tenant-policy-faqs";
import { getPublicSiteUrl } from "@/src/lib/schema";
import { pageLayout } from "@/src/tokens/layout";

export function TenantPolicyFaq() {
  const faqs = getTenantPolicyFaqs(getPublicSiteUrl());

  return (
    <section className="border-t border-gray-200 bg-white py-12 md:py-16">
      <div className={pageLayout.container}>
        <h2 className="font-satoshi text-2xl font-bold text-gray-900 md:text-3xl">
          Frequently asked questions
        </h2>
        <p className="mt-2 max-w-2xl text-base text-gray-600">
          Quick answers about booking, payments, move-in, and move-out at
          HelloWorld.
        </p>
        <FaqAccordion
          items={faqs}
          defaultOpenId={faqs[0]?.id}
          className="mt-8"
        />
      </div>
    </section>
  );
}
