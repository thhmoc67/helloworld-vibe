import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type {
  BlogFaq,
  BlogFrontmatter,
  BlogPost,
  BlogPostMeta,
  BlogTopic,
} from "@/src/lib/blog.shared";
import { topicSlug } from "@/src/lib/blog.shared";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const WORDS_PER_MINUTE = 200;
const DEFAULT_OG_IMAGE =
  "https://images.thehelloworld.com/property/610/hdp/desktop/1572848029NXC.jpeg";

function isMdxFile(name: string) {
  return name.toLowerCase().endsWith(".mdx");
}

function toIsoDateOnly(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const s = value.trim();
  if (!s) return undefined;
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString().split("T")[0];
}

function normalizeAuthor(raw: unknown): BlogFrontmatter["author"] {
  if (typeof raw === "string" && raw.trim()) return raw.trim();
  if (raw && typeof raw === "object") {
    const rec = raw as Record<string, unknown>;
    const name = typeof rec.name === "string" ? rec.name.trim() : "";
    if (!name) return undefined;
    const url = typeof rec.url === "string" ? rec.url.trim() : undefined;
    return url ? { name, url } : { name };
  }
  return undefined;
}

function normalizeFaqs(raw: unknown): BlogFaq[] | undefined {
  if (!Array.isArray(raw)) return undefined;
  const out: BlogFaq[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const rec = item as Record<string, unknown>;
    const q = rec.question ?? rec.q;
    const a = rec.answer ?? rec.a;
    if (typeof q === "string" && typeof a === "string") {
      const question = q.trim();
      const answer = a.trim();
      if (question && answer) out.push({ question, answer });
    }
  }
  return out.length ? out : undefined;
}

function normalizeFrontmatter(raw: Record<string, unknown>, file: string): BlogFrontmatter {
  const title = typeof raw?.title === "string" ? raw.title.trim() : "";
  const header =
    typeof raw?.header === "string" && raw.header.trim() ? raw.header.trim() : title;
  const description =
    typeof raw?.description === "string" ? raw.description.trim() : "";
  const slug = typeof raw?.slug === "string" ? raw.slug.trim() : "";
  const date = toIsoDateOnly(raw?.date) || "";
  const updated = toIsoDateOnly(raw?.updated);
  const tags = Array.isArray(raw?.tags)
    ? raw.tags
        .filter((t): t is string => typeof t === "string" && t.trim().length > 0)
        .map((t) => t.trim())
    : undefined;
  const author = normalizeAuthor(raw?.author);
  const faqs = normalizeFaqs(raw?.faqs);
  const image =
    typeof raw?.image === "string" && raw.image.trim()
      ? raw.image.trim()
      : DEFAULT_OG_IMAGE;
  const thumbnail =
    typeof raw?.thumbnail === "string" && raw.thumbnail.trim()
      ? raw.thumbnail.trim()
      : image;
  const banner =
    typeof raw?.banner === "string" && raw.banner.trim()
      ? raw.banner.trim()
      : image;
  const canonicalUrl =
    typeof raw?.canonicalUrl === "string" ? raw.canonicalUrl.trim() : undefined;
  const noindex = Boolean(raw?.noindex);

  if (!title || !description || !slug || !date) {
    throw new Error(`Invalid frontmatter in ${file}. Required: title, description, slug, date`);
  }

  return {
    title,
    header,
    description,
    slug,
    date,
    ...(updated ? { updated } : {}),
    ...(tags?.length ? { tags } : {}),
    ...(author ? { author } : {}),
    ...(thumbnail ? { thumbnail } : {}),
    ...(banner ? { banner } : {}),
    ...(image ? { image } : {}),
    ...(canonicalUrl ? { canonicalUrl } : {}),
    ...(noindex ? { noindex } : {}),
    ...(faqs ? { faqs } : {}),
  };
}

function getReadTimeMinutes(text: string): number {
  const words = text.trim().split(/\s+/g).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter(isMdxFile)
    .map((f) => f.replace(/\.mdx$/i, ""));
}

export function getAllBlogPostsMeta(): BlogPostMeta[] {
  const files = getAllBlogSlugs();
  const metas = files
    .filter((file) => !file.startsWith("_"))
    .map((file) => {
      const fullPath = path.join(BLOG_DIR, `${file}.mdx`);
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(raw);
      const fm = normalizeFrontmatter(data as Record<string, unknown>, `${file}.mdx`);
      return {
        ...fm,
        file,
        urlPath: `/blogs/${fm.slug}`,
        readTimeMinutes: getReadTimeMinutes(content),
      };
    });

  return metas.sort((a, b) => {
    const aTime = Date.parse(a.date);
    const bTime = Date.parse(b.date);
    if (!Number.isNaN(aTime) && !Number.isNaN(bTime)) return bTime - aTime;
    return b.slug.localeCompare(a.slug);
  });
}

export function getAllBlogTopics(): BlogTopic[] {
  const posts = getAllBlogPostsMeta();
  const map = new Map<string, { label: string; count: number }>();
  for (const post of posts) {
    for (const tag of post.tags || []) {
      const label = String(tag).trim();
      if (!label) continue;
      const slug = topicSlug(label);
      if (!slug) continue;
      const existing = map.get(slug);
      if (!existing) map.set(slug, { label, count: 1 });
      else map.set(slug, { label: existing.label, count: existing.count + 1 });
    }
  }

  return Array.from(map.entries())
    .map(([slug, v]) => ({ slug, label: v.label, count: v.count }))
    .sort((a, b) =>
      b.count !== a.count ? b.count - a.count : a.label.localeCompare(b.label),
    );
}

export function getBlogPostFileBySlug(slug: string): string | null {
  const metas = getAllBlogPostsMeta();
  const match = metas.find((m) => m.slug === slug);
  return match?.file || null;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const file = getBlogPostFileBySlug(slug);
  if (!file) return null;
  const fullPath = path.join(BLOG_DIR, `${file}.mdx`);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(raw);
  const fm = normalizeFrontmatter(data as Record<string, unknown>, `${file}.mdx`);

  return {
    ...fm,
    file,
    urlPath: `/blogs/${fm.slug}`,
    readTimeMinutes: getReadTimeMinutes(content),
    body: content,
  };
}
