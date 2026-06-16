import type { SrpPageSchema } from "@/src/lib/schema";

export function JsonLd({ schema }: { schema: SrpPageSchema }) {
  const payloads = [
    schema.webPage,
    schema.breadcrumb,
    schema.itemList,
    schema.faqPage,
  ].filter(Boolean);

  return (
    <>
      {payloads.map((entry, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}
    </>
  );
}
