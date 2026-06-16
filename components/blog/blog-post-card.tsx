import Image from "next/image";
import Link from "next/link";
import type { BlogPostMeta } from "@/src/lib/blog.shared";

type BlogPostCardProps = {
  post: BlogPostMeta;
  imageHeightClassName?: string;
  className?: string;
};

export function BlogPostCard({
  post,
  imageHeightClassName = "h-44",
  className,
}: BlogPostCardProps) {
  return (
    <li
      className={`flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white ${className || ""}`}
    >
      <Link href={post.urlPath} className="group block flex-1">
        {post.thumbnail ? (
          <div className="bg-gray-100">
            <Image
              src={post.thumbnail}
              alt={post.title}
              width={1200}
              height={630}
              className={`${imageHeightClassName} w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]`}
            />
          </div>
        ) : (
          <div className={`${imageHeightClassName} w-full bg-gray-100`} />
        )}

        <div className="p-5">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <time dateTime={post.date}>{post.date}</time>
            <span>•</span>
            <span>{post.readTimeMinutes} min read</span>
          </div>

          <div className="mt-2 text-base font-semibold leading-snug group-hover:underline">
            {post.title}
          </div>
          <p className="mt-2 line-clamp-3 text-sm text-gray-700">{post.description}</p>
        </div>
      </Link>
    </li>
  );
}
