"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { localityContactIllustration, localityPage } from "@/src/tokens/locality";
import { cn } from "@/src/lib/cn";

export function LocalityContactCard({
  className,
  sticky = false,
}: {
  className?: string;
  sticky?: boolean;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  return (
    <aside
      className={cn(
        "overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm",
        sticky && "lg:sticky lg:top-24",
        className,
      )}
      aria-label="Contact us"
    >
      <div className="relative bg-gradient-to-br from-hello-lime-50 to-blue-light-50 px-6 pb-4 pt-6">
        <Image
          src={localityContactIllustration}
          alt=""
          width={280}
          height={200}
          className="mx-auto h-auto w-full max-w-[17.5rem] object-contain"
        />
      </div>

      <div className="space-y-5 px-6 pb-6 pt-2">
        <div className="space-y-1 text-center">
          <h2 className="text-xl font-bold text-gray-900">Need help finding a home?</h2>
          <p className="text-sm text-gray-600">
            Our team will call you back with the best options in{" "}
            {localityPage.name}.
          </p>
        </div>

        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-gray-700">Full Name</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
              className="h-11 w-full rounded-xl border border-gray-300 px-3.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-hello-lime-500 focus:ring-2 focus:ring-hello-lime-100"
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-gray-700">Phone Number</span>
            <input
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="Enter your phone number"
              className="h-11 w-full rounded-xl border border-gray-300 px-3.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-hello-lime-500 focus:ring-2 focus:ring-hello-lime-100"
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-gray-700">
              Message{" "}
              <span className="font-normal text-gray-400">(optional)</span>
            </span>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Tell us what you're looking for"
              rows={3}
              className="w-full resize-none rounded-xl border border-gray-300 px-3.5 py-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-hello-lime-500 focus:ring-2 focus:ring-hello-lime-100"
            />
          </label>

          <Button
            type="submit"
            className="w-full bg-hello-lime-400 text-gray-900 hover:bg-hello-lime-500"
          >
            Request Callback
          </Button>
        </form>
      </div>
    </aside>
  );
}
