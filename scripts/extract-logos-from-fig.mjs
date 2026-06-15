/**
 * Extract HelloWorld brand logos from a local Figma .fig export.
 *
 * Usage:
 *   node scripts/extract-logos-from-fig.mjs [path-to-file.fig]
 *
 * Defaults to ~/Downloads/Helloworld Revamp.fig
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  parseFig,
  nodeId,
  resolveVectorNodePaths,
  resolveGradientGeometry,
} from "openfig-core";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "../public/logos");
const DEFAULT_FIG = path.resolve(
  process.env.HOME ?? "",
  "Downloads/Helloworld Revamp.fig",
);

const LOGOS_NODE_ID = "2501:24581";

/** Logo frames to export — ids from Brand Logos (2501:24581) in Helloworld Revamp.fig */
const EXPORT_TARGETS = [
  { id: "2113:34162", slug: "app-icon", label: "App Icon" },
  { id: "2113:34163", slug: "logo-with-wordmark", label: "Logo with Wordmark" },
  { id: "2113:34164", slug: "logo-mark", label: "Logo Mark" },
  { id: "2501:24585", slug: "favicon", label: "Favicon" },
  { id: "2501:24591", slug: "logo-variation-1", label: "Logo Variation 1" },
  { id: "2501:24593", slug: "logo-variation-2", label: "Logo Variation 2" },
  { id: "2501:24594", slug: "logo-variation-3", label: "Logo Variation 3" },
  { id: "2501:24604", slug: "monogram-1", label: "Monogram 1" },
  { id: "2501:24605", slug: "monogram-2", label: "Monogram 2" },
  { id: "2501:24606", slug: "monogram-3", label: "Monogram 3 (on dark)" },
  { id: "2501:24609", slug: "wordmark-1", label: "Word Mark 1" },
  { id: "2501:24610", slug: "wordmark-2", label: "Word Mark 2" },
];

const IDENTITY = { m00: 1, m01: 0, m02: 0, m10: 0, m11: 1, m12: 0 };

function multiply(a, b) {
  return {
    m00: a.m00 * b.m00 + a.m01 * b.m10,
    m01: a.m00 * b.m01 + a.m01 * b.m11,
    m02: a.m00 * b.m02 + a.m01 * b.m12 + a.m02,
    m10: a.m10 * b.m00 + a.m11 * b.m10,
    m11: a.m10 * b.m01 + a.m11 * b.m11,
    m12: a.m10 * b.m02 + a.m11 * b.m12 + a.m12,
  };
}

function invert(t) {
  const det = t.m00 * t.m11 - t.m01 * t.m10;
  if (Math.abs(det) < 1e-10) return IDENTITY;
  return {
    m00: t.m11 / det,
    m01: -t.m01 / det,
    m02: (t.m01 * t.m12 - t.m11 * t.m02) / det,
    m10: -t.m10 / det,
    m11: t.m00 / det,
    m12: (t.m10 * t.m02 - t.m00 * t.m12) / det,
  };
}

function getTransform(node) {
  return node?.transform ?? IDENTITY;
}

function buildParentMap(doc) {
  const parentMap = new Map();
  for (const [parentId, children] of doc.childrenMap) {
    for (const child of children) {
      parentMap.set(nodeId(child), parentId);
    }
  }
  return parentMap;
}

function absoluteTransform(doc, parentMap, id) {
  const chain = [];
  let current = id;
  while (current) {
    const node = doc.nodeMap.get(current);
    if (node) chain.unshift(getTransform(node));
    current = parentMap.get(current);
  }
  return chain.reduce((acc, t) => multiply(acc, t), IDENTITY);
}

function matrixAttr(t) {
  return `matrix(${t.m00} ${t.m10} ${t.m01} ${t.m11} ${t.m02} ${t.m12})`;
}

function figColorToCss(color, opacity = 1) {
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  const a = (color.a ?? 1) * opacity;
  if (a < 0.999) return `rgba(${r},${g},${b},${a.toFixed(3)})`;
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

function hashToKey(hash) {
  if (!hash) return null;
  return Object.values(hash)
    .map((byte) => Number(byte).toString(16).padStart(2, "0"))
    .join("");
}

function imageToDataUri(doc, paint) {
  const key = hashToKey(paint.image?.hash ?? paint.imageThumbnail?.hash);
  if (!key) return null;
  const bytes = doc.images.get(key);
  if (!bytes) return null;
  const header = String.fromCharCode(...bytes.slice(0, 4));
  const mime = header.startsWith("\x89PNG")
    ? "image/png"
    : header.startsWith("GIF")
      ? "image/gif"
      : header.includes("WEBP")
        ? "image/webp"
        : "image/jpeg";
  const base64 = Buffer.from(bytes).toString("base64");
  return `data:${mime};base64,${base64}`;
}

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function paintToFill(doc, paint, defs, size, idPrefix) {
  if (!paint || paint.visible === false) return "none";

  if (paint.type === "SOLID" && paint.color) {
    return figColorToCss(paint.color, paint.opacity ?? 1);
  }

  if (paint.type === "GRADIENT_LINEAR" && paint.stops?.length) {
    const gradId = `${idPrefix}-grad`;
    const geom = resolveGradientGeometry(
      {
        type: "linear",
        stops: paint.stops,
        transform: paint.transform,
      },
      size?.x ?? 1,
      size?.y ?? 1,
    );
    const stops = paint.stops
      .map((stop) => {
        const offset = Math.round((stop.position ?? 0) * 1000) / 10;
        return `<stop offset="${offset}%" stop-color="${figColorToCss(stop.color)}" />`;
      })
      .join("");
    if (geom?.type === "linear") {
      defs.push(
        `<linearGradient id="${gradId}" x1="${geom.start.x}" y1="${geom.start.y}" x2="${geom.end.x}" y2="${geom.end.y}" gradientUnits="userSpaceOnUse">${stops}</linearGradient>`,
      );
    } else {
      defs.push(
        `<linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="0%">${stops}</linearGradient>`,
      );
    }
    return `url(#${gradId})`;
  }

  if (paint.type === "IMAGE") {
    const dataUri = imageToDataUri(doc, paint);
    if (!dataUri) return "none";
    const patternId = `${idPrefix}-img`;
    defs.push(
      `<pattern id="${patternId}" patternUnits="userSpaceOnUse" width="${size?.x ?? 1}" height="${size?.y ?? 1}"><image href="${dataUri}" width="${size?.x ?? 1}" height="${size?.y ?? 1}" preserveAspectRatio="xMidYMid slice" /></pattern>`,
    );
    return `url(#${patternId})`;
  }

  return "none";
}

function hasGeometry(node) {
  return (
    node.type === "VECTOR" ||
    (Array.isArray(node.fillGeometry) && node.fillGeometry.length > 0)
  );
}

function collectNodes(doc, rootId) {
  const result = [];
  const stack = [rootId];
  while (stack.length) {
    const id = stack.pop();
    const node = doc.nodeMap.get(id);
    if (!node || node.visible === false) continue;
    result.push(node);
    const children = doc.childrenMap.get(id) ?? [];
    for (let i = children.length - 1; i >= 0; i--) {
      stack.push(nodeId(children[i]));
    }
  }
  return result;
}

function exportNodeToSvg(doc, parentMap, target) {
  const root = doc.nodeMap.get(target.id);
  if (!root?.size) throw new Error(`Missing export root: ${target.id}`);

  const rootAbs = absoluteTransform(doc, parentMap, target.id);
  const rootInv = invert(rootAbs);
  const width = Math.ceil(root.size.x);
  const height = Math.ceil(root.size.y);
  const defs = [];
  const shapes = [];
  let shapeIndex = 0;

  for (const node of collectNodes(doc, target.id)) {
    const id = nodeId(node);
    const isRoot = id === target.id;

    if (isRoot && !hasGeometry(node) && node.type !== "TEXT") continue;

    const nodeAbs = absoluteTransform(doc, parentMap, id);
    const rel = multiply(rootInv, nodeAbs);

    if (node.type === "TEXT" && node.textData?.characters) {
      const paint = node.fillPaints?.find((p) => p.visible !== false);
      const fill =
        paint?.type === "SOLID" && paint.color
          ? figColorToCss(paint.color, paint.opacity ?? 1)
          : "#000000";
      const family = node.fontName?.family ?? "Satoshi";
      shapes.push(
        `<text transform="${matrixAttr(rel)}" font-family="${escapeXml(family)}, Satoshi, sans-serif" font-size="${node.fontSize ?? 16}" fill="${fill}" dominant-baseline="hanging">${escapeXml(node.textData.characters)}</text>`,
      );
      continue;
    }

    if (!hasGeometry(node)) continue;

    const paths = resolveVectorNodePaths(doc, node);
    for (const pathEntry of paths.fill) {
      const paint = pathEntry.paints?.find((p) => p.visible !== false);
      if (!paint) continue;
      const fillId = `${target.slug}-${shapeIndex++}`;
      const fill = paintToFill(doc, paint, defs, node.size, fillId);
      const rule =
        pathEntry.windingRule === "EVENODD" ? "evenodd" : "nonzero";
      shapes.push(
        `<g transform="${matrixAttr(rel)}"><path d="${pathEntry.svgPath}" fill="${fill}" fill-rule="${rule}" /></g>`,
      );
    }
  }

  const defsBlock = defs.length ? `<defs>${defs.join("")}</defs>` : "";
  return `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">${defsBlock}${shapes.join("")}</svg>\n`;
}

function main() {
  const figPath = process.argv[2] ? path.resolve(process.argv[2]) : DEFAULT_FIG;
  const doc = parseFig(new Uint8Array(readFileSync(figPath)));
  const parentMap = buildParentMap(doc);

  const logosRoot = doc.nodeMap.get(LOGOS_NODE_ID);
  if (!logosRoot) {
    throw new Error(`Brand Logos frame (${LOGOS_NODE_ID}) not found in ${figPath}`);
  }

  mkdirSync(OUT_DIR, { recursive: true });

  const manifest = {
    source: path.basename(figPath),
    nodeId: LOGOS_NODE_ID,
    logos: [],
  };

  for (const target of EXPORT_TARGETS) {
    if (!doc.nodeMap.has(target.id)) {
      console.warn(`Skip missing node: ${target.label} (${target.id})`);
      continue;
    }

    const svg = exportNodeToSvg(doc, parentMap, target);
    const filename = `${target.slug}.svg`;
    writeFileSync(path.join(OUT_DIR, filename), svg);
    manifest.logos.push({
      name: target.label,
      id: target.id,
      file: `/logos/${filename}`,
    });
    console.log(`Exported ${filename}`);
  }

  writeFileSync(
    path.join(OUT_DIR, "manifest.json"),
    JSON.stringify(manifest, null, 2),
  );

  console.log(`\nDone. ${manifest.logos.length} logos → public/logos/`);
}

main();
