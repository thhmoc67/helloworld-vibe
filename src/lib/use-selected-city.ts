"use client";

import { useEffect, useState } from "react";
import {
  CITY_CHANGE_EVENT,
  readStoredCity,
} from "@/src/lib/city-storage";
import { defaultCitySlug, type CitySlug } from "@/src/tokens/cities";

export function useSelectedCity() {
  const [city, setCity] = useState<CitySlug>(defaultCitySlug);

  useEffect(() => {
    setCity(readStoredCity());

    function handleStorage(event: StorageEvent) {
      if (event.key === "helloworld-selected-city") {
        setCity(readStoredCity());
      }
    }

    function handleCityChange(event: Event) {
      const nextCity = (event as CustomEvent<CitySlug>).detail;
      if (nextCity) setCity(nextCity);
    }

    window.addEventListener("storage", handleStorage);
    window.addEventListener(CITY_CHANGE_EVENT, handleCityChange);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(CITY_CHANGE_EVENT, handleCityChange);
    };
  }, []);

  return city;
}
