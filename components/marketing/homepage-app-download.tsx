import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { cn } from "@/src/lib/cn";
import { pageShell } from "@/src/tokens/layout";
import {
  homepageAppScreenshot1,
  homepageAppScreenshot2,
} from "@/src/tokens/homepage";
import { whiteWordmark } from "@/src/tokens/logos";

function PlayStoreIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 30 33" className={cn("size-7 shrink-0", className)}>
      <path
        fill="currentColor"
        d="M1.5 1.2 16.8 16.5 1.5 31.8A1.5 1.5 0 0 1 0 30.5V2.5a1.5 1.5 0 0 1 1.5-1.3Z"
      />
      <path
        fill="currentColor"
        d="M18.5 14.2 4.8 0.5l12.2 7.1a1.5 1.5 0 0 1 0 2.6Z"
      />
      <path
        fill="currentColor"
        d="m18.5 18.8-12.2 7.1 13.7-13.7a1.5 1.5 0 0 0 0-2.6Z"
      />
      <path
        fill="currentColor"
        d="M29.2 15.5 20.5 20.5l-2-1.2 2-1.2 8.7-5a1.5 1.5 0 0 1 0 2.6Z"
      />
    </svg>
  );
}

function AppStoreIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 30 30" className={cn("size-7 shrink-0", className)}>
      <path
        fill="currentColor"
        d="M22.7 16.1c.02 2.2 1.9 2.9 1.93 2.9-.02.06-.3 1.03-1 2.04-.6.87-1.22 1.74-2.2 1.76-.96.02-1.27-.57-2.37-.57-1.1 0-1.44.55-2.35.59-.95.04-1.67-.95-2.28-1.82-1.24-1.8-2.19-5.08-.92-7.3.63-1.1 1.76-1.8 2.99-1.82.93-.02 1.81.63 2.38.63.56 0 1.62-.78 2.73-.66.46.02 1.76.19 2.59 1.43-.07.04-1.55.9-1.53 2.7ZM20.1 4.8c.5.61.84 1.46.75 2.31-.72.03-1.6-.48-2.1-1.09-.46-.56-.87-1.46-.76-2.32.8-.06 1.62.49 2.11 1.1Z"
      />
    </svg>
  );
}

function StoreBadge({
  href,
  topLabel,
  bottomLabel,
  icon,
}: {
  href: string;
  topLabel: string;
  bottomLabel: string;
  icon: ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-11 min-w-0 flex-1 items-center gap-2 rounded-lg bg-hello-lime-400 px-3 text-black transition-colors hover:bg-hello-lime-500 sm:h-[3.375rem] sm:flex-none sm:px-4"
    >
      {icon}
      <span className="min-w-0 text-left">
        <span className="block text-[10px] font-medium leading-[18px] sm:text-xs">
          {topLabel}
        </span>
        <span className="block truncate text-sm font-bold leading-5 sm:text-lg sm:leading-7">
          {bottomLabel}
        </span>
      </span>
    </Link>
  );
}

function AppDownloadHeading() {
  return (
    <h2 className="text-2xl font-bold leading-8 tracking-tight text-gray-900 sm:text-[2rem] sm:leading-10 lg:text-[2.25rem] lg:leading-11 lg:tracking-[-0.02em] lg:whitespace-nowrap">
      From Booking to{" "}
      <span className="font-satoshi font-bold italic text-gradient-belonging">
        Belonging.
      </span>
    </h2>
  );
}

export function HomepageAppDownload() {
  return (
    <section
      className="relative lg:min-h-[25.375rem]"
      style={{
        backgroundImage:
          "linear-gradient(122deg, #d5ecf9 11.5%, #ffffff 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[min(100%,36rem)] overflow-hidden"
      >
        <Logo
          variant={whiteWordmark}
          width={250}
          height={143}
          className="absolute bottom-4 left-0 h-auto w-[18rem] max-w-none opacity-[0.5] sm:bottom-6 sm:w-[22rem] sm:opacity-[0.18] lg:bottom-8 lg:left-2 lg:w-[28rem] lg:opacity-[0.4] xl:w-[32rem]"
        />
      </div>

      <div className={cn("relative overflow-hidden flex justify-center", pageShell.homepage)}>
        <div className="flex flex-col justify-center gap-8 py-10 sm:gap-10 sm:py-12 lg:grid lg:min-h-[25.375rem] lg:grid-cols-[minmax(0,31.75rem)_minmax(0,1fr)] lg:items-center lg:gap-6 lg:py-0">
          <div className="relative z-10 mx-auto h-[12.5rem] w-full max-w-[18rem] sm:h-[15.5rem] sm:max-w-[20rem] lg:mx-0 lg:h-[25.375rem] lg:max-w-[31.75rem]">
            <Image
              src={homepageAppScreenshot1.file}
              alt={homepageAppScreenshot1.name}
              width={250}
              height={497}
              className="absolute left-[2%] bottom-12 z-10 w-[49%] object-contain drop-shadow-[0_8px_24px_rgba(16,24,40,0.12)]"
            />
            <Image
              src={homepageAppScreenshot2.file}
              alt={homepageAppScreenshot2.name}
              width={262}
              height={497}
              className="absolute bottom-0 left-[47%] z-0 w-[51%] object-contain drop-shadow-[0_8px_24px_rgba(16,24,40,0.12)] lg:top-16"
            />
          </div>

          <div className="relative z-10 flex min-w-0 flex-col gap-3 text-left lg:max-w-2xl">
            <AppDownloadHeading />

            <p className="text-base leading-7 text-gray-600 sm:text-lg">
              Find homes, manage stays, and stay connected.
            </p>

            <div className="mt-1 flex w-full flex-col gap-3 sm:mt-2 sm:flex-row sm:items-center sm:gap-4">
              <StoreBadge
                href="https://play.google.com/store/apps/details?id=com.thehelloworld"
                topLabel="Get it on"
                bottomLabel="Google Play"
                icon={<PlayStoreIcon className="size-5 text-black sm:size-7" />}
              />
              <StoreBadge
                href="https://itunes.apple.com/in/app/hello-world-homes/id1481207096"
                topLabel="Get it on"
                bottomLabel="App Store"
                icon={<AppStoreIcon className="size-5 text-black sm:size-7" />}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
