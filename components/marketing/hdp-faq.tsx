import { FaqAccordion } from "@/components/ui/faq-accordion";
import { hdpFaqs } from "@/src/tokens/hdp-faqs";
import { cn } from "@/src/lib/cn";

export function HdpFaq({ className }: { className?: string }) {
  return (
    <section
      className={cn("space-y-8", className)}
      aria-label="Frequently asked questions"
    >
      <h2 className="text-2xl font-medium text-black md:text-[1.875rem] md:leading-[2.375rem]">
        Frequently Asked Questions
      </h2>
      <FaqAccordion items={hdpFaqs} defaultOpenId={hdpFaqs[0]?.id} />
    </section>
  );
}
