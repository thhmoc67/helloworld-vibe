import type { ReactNode } from "react";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { MDXRemote } from "next-mdx-remote/rsc";

const LEADING_LABEL_REGEX = /^([A-Z][A-Za-z0-9'’&(),/\-\s]{2,80}:)\s+/;

function MdxParagraph({ children }: { children?: ReactNode }) {
  const nodes = Array.isArray(children) ? [...children] : [children];
  const first = nodes[0];
  if (typeof first !== "string") return <p>{children}</p>;

  const match = first.match(LEADING_LABEL_REGEX);
  if (!match) return <p>{children}</p>;

  const label = match[1];
  nodes[0] = first.slice(label.length).trimStart();

  return (
    <p>
      <strong>{label}</strong> {nodes}
    </p>
  );
}

export async function BlogArticle({ source }: { source: string }) {
  return MDXRemote({
    source,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
              properties: { className: ["mdx-heading-anchor"] },
            },
          ],
        ],
      },
    },
    components: { p: MdxParagraph },
  });
}
