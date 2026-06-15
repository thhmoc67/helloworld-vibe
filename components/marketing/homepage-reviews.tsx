import { cn } from "@/src/lib/cn";
import {
  homepageReviews,
  type HomepageReview,
} from "@/src/tokens/reviews";

export type HomepageReviewsProps = {
  reviews?: HomepageReview[];
  className?: string;
  title?: string;
};

function TapeStrip() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-3 h-3 w-16 -translate-x-1/2 rounded-[1px] bg-[#f5e6b8]/80 shadow-[0_1px_1px_rgba(0,0,0,0.08)]"
    />
  );
}

function ReviewCard({ review }: { review: HomepageReview }) {
  return (
    <article
      className="relative h-80 w-80 shrink-0 shadow-[0_10px_28px_rgba(0,0,0,0.22)]"
      style={{
        backgroundColor: review.backgroundColor,
        transform: `rotate(${review.rotation}deg)`,
      }}
    >
      <TapeStrip />
      <div className="flex h-full flex-col justify-between p-8 pt-10">
        <p className="text-sm font-medium leading-5 text-[#1e2939]">
          {review.quote}
        </p>
        <div>
          <p className="text-base font-bold leading-6 text-[#101828]">
            {review.name}
          </p>
          <p className="text-xs font-normal leading-[18px] text-[#364153]">
            {review.city}
          </p>
        </div>
      </div>
    </article>
  );
}

export function HomepageReviews({
  reviews = homepageReviews,
  className,
  title = "Homepage Reviews",
}: HomepageReviewsProps) {
  return (
    <section
      className={cn("bg-[#3d3d3d] px-4 py-12 md:px-8", className)}
    >
      {title ? (
        <h2 className="mb-8 text-lg font-medium text-gray-300">{title}</h2>
      ) : null}
      <div className="-mx-2 flex gap-5 overflow-x-auto px-2 py-6 scrollbar-none md:gap-6">
        {reviews.map((review) => (
          <ReviewCard key={`${review.name}-${review.city}`} review={review} />
        ))}
      </div>
    </section>
  );
}
