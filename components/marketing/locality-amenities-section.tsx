import Image from "next/image";
import type { LocalityAmenity } from "@/src/tokens/locality";

export function LocalityAmenitiesSection({
  amenities,
}: {
  amenities: readonly LocalityAmenity[];
}) {
  return (
    <section aria-label="Included amenities">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 md:text-[1.875rem] md:leading-[2.375rem]">
        Included Across Our Homes
      </h2>
      <div className="mt-6 flex flex-wrap gap-x-8 gap-y-6">
        {amenities.map((amenity) => (
          <div
            key={amenity.id}
            className="flex w-[6.125rem] flex-col items-center gap-3 text-center"
          >
            <Image
              src={amenity.iconSrc}
              alt=""
              width={45}
              height={40}
              className="h-10 w-auto object-contain"
            />
            <p className="text-sm font-medium text-gray-800">{amenity.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
