import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/src/lib/cn";
import { pageLayout } from "@/src/tokens/layout";

function PlayStoreIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 30 33" className={className}>
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
    <svg aria-hidden viewBox="0 0 30 30" className={className}>
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
      className="inline-flex h-11 min-w-0 flex-1 items-center gap-2 rounded-lg bg-hello-lime-400 px-3 text-black transition-colors hover:bg-hello-lime-500 sm:h-[3.375rem] sm:px-4"
    >
      {icon}
      <span className="min-w-0 text-left">
        <span className="block text-[10px] font-medium leading-[18px] sm:text-xs">
          {topLabel}
        </span>
        <span className="block text-sm font-bold leading-5 sm:text-lg sm:leading-7">
          {bottomLabel}
        </span>
      </span>
    </Link>
  );
}

export function MyVisitsAppDownload() {
  return (
    <section className="flex flex-1 flex-col bg-white">
      <div
        className={cn(
          pageLayout.container,
          "flex flex-1 flex-col items-center justify-center py-10 sm:py-14",
        )}
      >
        <div className="mx-auto flex w-full max-w-xl flex-col items-center text-center">
          <div className="relative w-full max-w-[22rem] sm:max-w-[26rem]">
            <Image
              src="/assets/my-visits/phones.png"
              alt="HelloWorld app showing My Visits screens"
              width={339}
              height={393}
              priority
              className="h-auto w-full object-contain"
            />
          </div>

          <h1 className="mt-8 text-3xl font-bold tracking-tight text-gray-900 sm:mt-10 sm:text-4xl">
            Your Next Home is Just a Tap Away
          </h1>

          <p className="mt-4 max-w-md text-base leading-7 text-gray-600 sm:text-lg">
            From finding the perfect room to moving in, manage everything from
            the Helloworld app.
          </p>

          <div className="mt-8 flex w-full max-w-md gap-3">
            <StoreBadge
              href="https://play.google.com/store/apps/details?id=com.thehelloworld"
              topLabel="Get it on"
              bottomLabel="Google Play"
              icon={<PlayStoreIcon className="size-5 shrink-0 sm:size-7" />}
            />
            <StoreBadge
              href="https://itunes.apple.com/in/app/hello-world-homes/id1481207096"
              topLabel="Get it on"
              bottomLabel="App Store"
              icon={<AppStoreIcon className="size-5 shrink-0 sm:size-7" />}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
