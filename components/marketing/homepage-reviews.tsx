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
      className="relative h-72 w-[min(18rem,calc(100vw-3rem))] shrink-0 shadow-[0_10px_28px_rgba(0,0,0,0.22)] sm:h-80 sm:w-80"
      style={{
        backgroundColor: review.backgroundColor,
        transform: `rotate(${review.rotation}deg)`,
      }}
    >
      <TapeStrip />
      <div className="flex h-full flex-col justify-between p-6 pt-9 sm:p-8 sm:pt-10">
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
      className={cn("bg-[#3d3d3d] px-4 py-10 sm:py-12 md:px-8", className)}
    >
      {title ? (
        <h2 className="mb-6 text-base font-medium text-gray-300 sm:mb-8 sm:text-lg">
          {title}
        </h2>
      ) : null}
      <div className="-mx-2 flex gap-4 overflow-x-auto px-2 py-4 scrollbar-none sm:gap-5 sm:py-6 md:gap-6">
        {reviews.map((review) => (
          <ReviewCard key={`${review.name}-${review.city}`} review={review} />
        ))}
      </div>
    </section>
  );
}
