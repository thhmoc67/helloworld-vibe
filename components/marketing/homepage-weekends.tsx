import Link from "next/link";
import { HomepageAsset } from "@/components/marketing/homepage-asset";
import { cn } from "@/src/lib/cn";
import { homepageStats, homepageVideo } from "@/src/tokens/homepage";

function StatDivider() {
  return (
    <div
      aria-hidden
      className="hidden h-10 w-px shrink-0 bg-gray-300 lg:block"
    />
  );
}

function WeekendsHeading() {
  return (
    <div className="relative inline-block text-left">
      <h2 className="font-playfair text-display-sm font-bold tracking-tight text-gray-900 sm:text-display-md">
        <span className="block">Weekends hit</span>
        <span className="mt-1 block leading-none sm:mt-2">
          <span
            className={cn(
              "font-satoshi text-display-lg font-bold italic leading-[1.05] text-gradient-different",
              "sm:text-display-xl md:text-display-2xl",
            )}
          >
            Different
          </span>{" "}
          <span className="relative inline-block align-baseline">
            here
            <span
              aria-hidden
              className="absolute -bottom-4 left-0 w-max rotate-[-2.4deg] bg-blue-light-300 px-4 py-0.5 font-caveat text-sm text-gray-900 sm:-bottom-5 sm:px-5 sm:text-base"
            >
              ✦ ps. Good vibes only!
            </span>
          </span>
        </span>
      </h2>
    </div>
  );
}

export function HomepageWeekends() {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="overflow-hidden rounded-tl-[2rem] bg-gray-900 shadow-[11px_9px_0_0_#0baaec]">
            <video
              className="aspect-video w-full object-cover"
              src={homepageVideo.file}
              muted
              loop
              playsInline
              autoPlay
              aria-label={homepageVideo.name}
            />
          </div>

          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="pb-8 sm:pb-10">
              <WeekendsHeading />
            </div>

            <div className="flex w-full max-w-xl flex-wrap items-center justify-center gap-4 sm:gap-6 lg:flex-nowrap lg:justify-start lg:gap-0">
              {homepageStats.map((stat, index) => (
                <div key={stat.id} className="contents">
                  {index > 0 ? <StatDivider /> : null}
                  <div className="flex min-w-[4.5rem] items-center gap-2 sm:min-w-[5rem] lg:px-4">
                    <HomepageAsset
                      asset={stat.icon}
                      width={32}
                      height={32}
                      className="size-8 shrink-0"
                    />
                    <div className="text-left">
                      <p className="text-xl font-bold leading-7 text-gray-900 sm:text-2xl sm:leading-8">
                        {stat.value}
                      </p>
                      <p className="text-xs leading-[18px] text-gray-600">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/community"
              className="mt-8 inline-flex h-12 items-center justify-center self-center rounded-full bg-hello-lime-400 px-8 text-base font-bold text-gray-900 transition-colors hover:bg-hello-lime-500 sm:mt-10 lg:self-start"
            >
              See What&apos;s Happening!
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
