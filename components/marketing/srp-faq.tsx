import { FaqAccordion } from "@/components/ui/faq-accordion";
import { cn } from "@/src/lib/cn";

export function SrpFaq({
  items,
  className,
}: {
  items: readonly { id?: string; question: string; answer: string }[];
  className?: string;
}) {
  if (items.length === 0) return null;

  const accordionItems = items.map((item, index) => ({
    id: item.id ?? `faq-${index}`,
    question: item.question,
    answer: item.answer,
  }));

  return (
    <section
      className={cn("space-y-8", className)}
      aria-label="Frequently asked questions"
    >
      <h2 className="text-2xl font-medium text-black md:text-[1.875rem] md:leading-[2.375rem]">
        Frequently Asked Questions
      </h2>
      <FaqAccordion
        items={accordionItems}
        defaultOpenId={accordionItems[0]?.id}
      />
    </section>
  );
}
