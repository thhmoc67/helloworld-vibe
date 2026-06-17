type JsonLdEntry = object;

export function JsonLd({
  schema,
}: {
  schema: {
    webPage: JsonLdEntry;
    breadcrumb: JsonLdEntry;
    itemList?: JsonLdEntry;
    place?: JsonLdEntry;
    faqPage?: JsonLdEntry;
  };
}) {
  const payloads = [
    schema.webPage,
    schema.breadcrumb,
    schema.itemList,
    schema.place,
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
