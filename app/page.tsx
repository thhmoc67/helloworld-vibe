import Link from "next/link";
import { Logo } from "@/components/brand/logo";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-start justify-center gap-8 px-6 py-24">
      <Logo width={180} height={72} priority />
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-hello-lime-700">
          HelloWorld Revamp
        </p>
        <h1 className="mt-3 text-display-md font-bold tracking-tight text-gray-900">
          Design system is ready
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Tokens and components are configured from the Helloworld Revamp Figma
          file. Open the showcase page to verify colors, typography, and buttons.
        </p>
      </div>
      <div className="flex flex-wrap gap-4">
        <Link
          href="/design-system"
          className="inline-flex h-11 items-center justify-center rounded-lg bg-hello-lime-500 px-5 text-base font-semibold text-white shadow-xs transition-colors hover:bg-hello-lime-600"
        >
          View design system
        </Link>
        <Link
          href="/assets"
          className="inline-flex h-11 items-center justify-center rounded-lg border border-gray-300 bg-white px-5 text-base font-semibold text-gray-700 shadow-xs transition-colors hover:bg-gray-50"
        >
          Brand assets
        </Link>
      </div>
    </main>
  );
}
