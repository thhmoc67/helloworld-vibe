import { hdpAbout, hdpProperty } from "@/src/tokens/hdp";
import { cn } from "@/src/lib/cn";

export function HdpAbout({ className }: { className?: string }) {
  return (
    <section
      id="hdp-about"
      className={cn("scroll-mt-32 space-y-4", className)}
      aria-label="About section"
    >
      <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
        About {hdpProperty.name}
      </h2>
      <p className="text-base leading-7 text-gray-700">{hdpAbout}</p>
    </section>
  );
}
