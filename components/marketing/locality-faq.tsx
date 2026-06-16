import { FaqAccordion } from "@/components/ui/faq-accordion";
import { localityFaqs } from "@/src/tokens/locality";
import { cn } from "@/src/lib/cn";

export function LocalityFaq({ className }: { className?: string }) {
  return (
    <section
      className={cn("space-y-8", className)}
      aria-label="Frequently asked questions"
    >
      <h2 className="text-2xl font-medium text-black md:text-[1.875rem] md:leading-[2.375rem]">
        Frequently Asked Questions
      </h2>
      <FaqAccordion items={localityFaqs} defaultOpenId={localityFaqs[0]?.id} />
    </section>
  );
}
