import { FaqAccordion } from "@/components/ui/faq-accordion";
import { hdpFaqs } from "@/src/tokens/hdp-faqs";
import { cn } from "@/src/lib/cn";

export function HdpFaq({
  items,
  className,
}: {
  items?: { question: string; answer: string }[];
  className?: string;
}) {
  const faqItems =
    items && items.length > 0
      ? items.map((item, index) => ({
          id: `hdp-faq-${index}`,
          question: item.question,
          answer: item.answer,
        }))
      : hdpFaqs;

  return (
    <section
      className={cn("space-y-8", className)}
      aria-label="Frequently asked questions"
    >
      <h2 className="text-2xl font-medium text-black md:text-[1.875rem] md:leading-[2.375rem]">
        Frequently Asked Questions
      </h2>
      <FaqAccordion items={faqItems} defaultOpenId={faqItems[0]?.id} />
    </section>
  );
}
