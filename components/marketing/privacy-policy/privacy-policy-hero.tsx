import Image from "next/image";
import { cn } from "@/src/lib/cn";
import { pageShell } from "@/src/tokens/layout";
import { whiteWordmark } from "@/src/tokens/logos";

export function PrivacyPolicyHero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(140deg,#ffffff_4%,#d5ecf9_100%)]">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-6 bottom-0 hidden select-none lg:block xl:-right-10"
      >
        <Image
          src={whiteWordmark.file}
          alt=""
          width={400}
          height={229}
          className="mr-12 h-auto w-[min(16rem,42vw)] max-w-none opacity-50"
        />
      </div>
      <div className={cn(pageShell.chrome, "relative py-12 md:py-16")}>
        <h1 className="font-satoshi text-4xl font-bold tracking-tight text-gray-900">
          Privacy Policy
        </h1>
        <p className="mt-2 max-w-2xl text-lg font-medium text-gray-500">
          Understand how your information is collected and safeguarded.
        </p>
      </div>
    </section>
  );
}
