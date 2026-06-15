/**
 * Export logo assets from Figma node 2501:24581 (Helloworld Revamp → Logos).
 *
 * Usage:
 *   FIGMA_TOKEN=your-personal-access-token node scripts/export-figma-logos.mjs
 *
 * Create a token at: Figma → Settings → Security → Personal access tokens
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const FILE_KEY = "L9JgFzlEREM1SzApYIu3W8";
const LOGOS_NODE_ID = "2501:24581";
const TOKEN = process.env.FIGMA_TOKEN;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "../public/logos");

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

async function figmaGet(url) {
  const res = await fetch(url, {
    headers: { "X-Figma-Token": TOKEN },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.err || data.message || `Figma API ${res.status}`);
  }
  return data;
}

function collectLogoVariants(node) {
  const variants = [];
  const queue = [...(node.children ?? [])];

  while (queue.length) {
    const current = queue.shift();
    if (!current) continue;

    if (current.type === "SECTION") {
      queue.push(...(current.children ?? []));
      continue;
    }

    if (
      ["FRAME", "COMPONENT", "INSTANCE", "GROUP", "COMPONENT_SET"].includes(
        current.type,
      )
    ) {
      variants.push({ id: current.id, name: current.name });
      continue;
    }

    if (current.children?.length) {
      queue.push(...current.children);
    }
  }

  return variants;
}

async function downloadUrl(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed ${res.status}: ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
}

async function main() {
  if (!TOKEN) {
    console.error("Missing FIGMA_TOKEN environment variable.");
    process.exit(1);
  }

  await mkdir(OUT_DIR, { recursive: true });

  const nodesRes = await figmaGet(
    `https://api.figma.com/v1/files/${FILE_KEY}/nodes?ids=${encodeURIComponent(LOGOS_NODE_ID)}`,
  );

  const root = nodesRes.nodes?.[LOGOS_NODE_ID]?.document;
  if (!root) {
    throw new Error(`Node ${LOGOS_NODE_ID} not found in file ${FILE_KEY}`);
  }

  const exportable = collectLogoVariants(root);
  if (exportable.length === 0) {
    exportable.push({ id: LOGOS_NODE_ID, name: "logos-sheet" });
  }

  const ids = exportable.map((n) => n.id).join(",");
  const imagesRes = await figmaGet(
    `https://api.figma.com/v1/images/${FILE_KEY}?ids=${encodeURIComponent(ids)}&format=svg`,
  );

  const manifest = [];

  for (const item of exportable) {
    const url = imagesRes.images?.[item.id];
    if (!url) {
      console.warn(`Skip (no render): ${item.name} (${item.id})`);
      continue;
    }

    const filename = `${slugify(item.name) || "logo"}.svg`;
    const dest = path.join(OUT_DIR, filename);
    await downloadUrl(url, dest);
    manifest.push({ name: item.name, id: item.id, file: `/logos/${filename}` });
    console.log(`Exported ${filename}`);
  }

  await writeFile(
    path.join(OUT_DIR, "manifest.json"),
    JSON.stringify({ fileKey: FILE_KEY, nodeId: LOGOS_NODE_ID, logos: manifest }, null, 2),
  );

  console.log(`\nDone. ${manifest.length} logo(s) → public/logos/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
