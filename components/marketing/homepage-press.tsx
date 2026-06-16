import Image from "next/image";
import { HomepageSectionHeading } from "@/components/marketing/homepage-section-heading";
import { homepagePressLogos } from "@/src/tokens/homepage";

export function HomepagePress() {
  return (
    <section className="border-y border-gray-100 bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <HomepageSectionHeading
          prefix="We've been making"
          highlight="Headlines!"
          gradient="home"
        />

        <div className="mt-10 flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16">
          {homepagePressLogos.map((logo) => (
            <Image
              key={logo.id}
              src={logo.file}
              alt={logo.name}
              width={160}
              height={48}
              className="h-8 w-auto max-w-[8rem] object-contain opacity-70 grayscale transition-opacity hover:opacity-100 sm:h-10 sm:max-w-[10rem]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
