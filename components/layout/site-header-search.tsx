"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/brand/logo";
import { SiteHeaderSidebar } from "@/components/layout/site-header-sidebar";
import { LocationSearch } from "@/components/search/location-search";
import { cn } from "@/src/lib/cn";

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SiteHeaderSearch({
  userPhone = null,
  onLogin,
  onLogout,
}: {
  userPhone?: string | null;
  onLogin?: () => void;
  onLogout?: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-[5.5rem] max-w-7xl items-center gap-4 px-4 sm:px-6 lg:gap-6">
          <Link href="/" className="shrink-0">
            <Logo width={105} height={40} priority className="h-10 w-auto" />
          </Link>

          <div className="hidden min-w-0 flex-1 lg:block">
            <LocationSearch localityPlaceholder="Search for Localities" />
          </div>

          <div className="ml-auto flex items-center gap-3 sm:gap-4">
            <Link
              href="/contact"
              className="hidden h-9 items-center justify-center rounded-full bg-hello-lime-500 px-5 text-sm font-semibold text-white transition-colors hover:bg-hello-lime-600 sm:inline-flex"
            >
              Contact Us
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="site-header-sidebar"
              onClick={() => setMenuOpen(true)}
              className="flex size-9 items-center justify-center rounded-lg text-gray-900 transition-colors hover:bg-gray-50"
            >
              <MenuIcon className="size-6" />
            </button>
          </div>
        </div>

        <div className="border-t border-gray-100 px-4 pb-3 pt-2 lg:hidden">
          <LocationSearch localityPlaceholder="Search for Localities" />
        </div>
      </header>

      <SiteHeaderSidebar
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        userPhone={userPhone}
        onLogin={onLogin}
        onLogout={onLogout}
      />
    </>
  );
}
