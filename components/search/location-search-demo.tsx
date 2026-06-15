"use client";

import { useState } from "react";
import { LocationSearch } from "@/components/search/location-search";
import { getCityLabel, type CitySlug } from "@/src/tokens/cities";

export function LocationSearchDemo() {
  const [city, setCity] = useState<CitySlug>("bangalore");
  const [locality, setLocality] = useState("");

  return (
    <div className="w-full max-w-3xl space-y-4">
      <LocationSearch
        city={city}
        locality={locality}
        onCityChange={setCity}
        onLocalityChange={setLocality}
        onSearch={({ city, locality }) => {
          setCity(city);
          setLocality(locality);
        }}
      />
      <p className="text-sm text-gray-500">
        Selected:{" "}
        <span className="font-medium text-gray-700">
          {locality || "—"} · {getCityLabel(city)}
        </span>
      </p>
    </div>
  );
}
