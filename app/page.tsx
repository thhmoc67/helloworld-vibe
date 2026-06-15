import Link from "next/link";
import { Logo } from "@/components/brand/logo";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-start justify-center gap-8 px-4 py-16 sm:px-6 sm:py-24">
      <Logo width={180} height={72} priority className="max-w-[min(180px,70vw)]" />
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-hello-lime-700">
          HelloWorld Revamp
        </p>
        <h1 className="mt-3 text-display-sm font-bold tracking-tight text-gray-900 sm:text-display-md">
          Design system is ready
        </h1>
        <p className="mt-4 text-base text-gray-600 sm:text-lg">
          Tokens and components are configured from the Helloworld Revamp Figma
          file. Open the showcase page to verify colors, typography, and buttons.
        </p>
      </div>
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
        <Link
          href="/design-system"
          className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-hello-lime-500 px-5 text-base font-semibold text-white shadow-xs transition-colors hover:bg-hello-lime-600 sm:w-auto"
        >
          View design system
        </Link>
        <Link
          href="/assets"
          className="inline-flex h-11 w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-5 text-base font-semibold text-gray-700 shadow-xs transition-colors hover:bg-gray-50 sm:w-auto"
        >
          Brand assets
        </Link>
      </div>
    </main>
  );
}
