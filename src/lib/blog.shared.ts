export type BlogAuthorFrontmatter =
  | string
  | {
      name: string;
      url?: string;
    };

export type BlogFaq = {
  question: string;
  answer: string;
};

export interface BlogFrontmatter {
  title: string;
  header?: string;
  description: string;
  date: string;
  updated?: string;
  slug: string;
  tags?: string[];
  author?: BlogAuthorFrontmatter;
  thumbnail?: string;
  banner?: string;
  image?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  faqs?: BlogFaq[];
}

export interface BlogPostMeta extends BlogFrontmatter {
  file: string;
  urlPath: string;
  readTimeMinutes: number;
}

export interface BlogPost extends BlogPostMeta {
  /** Raw MDX body (without frontmatter). */
  body: string;
}

export type BlogTopic = {
  slug: string;
  label: string;
  count: number;
};

export function topicSlug(label: string): string {
  return label
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatTopicLabel(label: string): string {
  const s = String(label || "").trim();
  if (!s) return "";
  return s
    .split(/\s+/g)
    .map((word) => {
      if (word.length <= 1) return word.toUpperCase();
      if (word === word.toUpperCase()) return word;
      const lower = word.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
}
