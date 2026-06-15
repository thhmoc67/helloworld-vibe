import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { basename, dirname, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const sourceRoot =
  process.env.HW_VIBE_ASSETS ??
  join(process.env.HOME ?? "", "Desktop", "HW vibe assets");
const outputRoot = join(projectRoot, "public", "assets");

const categoryMap = {
  Booking: "booking",
  "Community Page": "community",
  "Error States_ Pagloo": "error",
  HDP: "hdp",
  Logos: "logos",
  "Locality, City, Landmark": "locality",
  Homepage_Website: "homepage-website",
};

const lottieSources = [
  { source: "Booking/Lottie Animations", target: "lotties/booking" },
  { source: "Payments- App/Lottie Animations", target: "lotties/payments" },
  { source: "Login Flow- App", target: "lotties/login", extension: ".json" },
];

function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function toTitleCase(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function ensureDir(path) {
  mkdirSync(path, { recursive: true });
}

function copyAsset({ sourcePath, targetDir, usedNames }) {
  const extension = extname(sourcePath).toLowerCase();
  const baseSlug = slugify(basename(sourcePath));
  let slug = baseSlug || "asset";
  let index = 2;

  while (usedNames.has(`${slug}${extension}`)) {
    slug = `${baseSlug}-${index}`;
    index += 1;
  }

  const filename = `${slug}${extension}`;
  usedNames.add(filename);

  const targetPath = join(targetDir, filename);
  ensureDir(targetDir);
  cpSync(sourcePath, targetPath);

  return {
    id: slug,
    name: toTitleCase(slug),
    file: `/${relative(join(projectRoot, "public"), targetPath).replace(/\\/g, "/")}`,
    originalName: basename(sourcePath),
    type: extension === ".json" ? "lottie" : extension === ".svg" ? "svg" : extension === ".mp4" ? "video" : "image",
    extension,
  };
}

function walkFiles(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;

    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkFiles(fullPath));
      continue;
    }

    if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

function syncCategory(sourceCategory, targetCategory) {
  const sourceDir = join(sourceRoot, sourceCategory);
  if (!existsSync(sourceDir)) {
    console.warn(`Skipping missing category: ${sourceCategory}`);
    return [];
  }

  const targetDir = join(outputRoot, targetCategory);
  const usedNames = new Set();
  const assets = [];

  for (const sourcePath of walkFiles(sourceDir)) {
    const extension = extname(sourcePath).toLowerCase();
    if (extension === ".json") continue;

    const relativePath = relative(sourceDir, sourcePath);
    const nestedDir = dirname(relativePath);
    const nestedSlug =
      nestedDir === "." ? "" : nestedDir.split(/[\\/]/).map(slugify).join("/");
    const targetSubdir = nestedSlug ? join(targetDir, nestedSlug) : targetDir;

    assets.push(
      copyAsset({
        sourcePath,
        targetDir: targetSubdir,
        usedNames,
      }),
    );
  }

  return assets;
}

function syncLotties() {
  const lotties = [];

  for (const { source, target, extension } of lottieSources) {
    const sourceDir = join(sourceRoot, source);
    if (!existsSync(sourceDir)) {
      console.warn(`Skipping missing lottie source: ${source}`);
      continue;
    }

    const targetDir = join(outputRoot, target);
    const usedNames = new Set();
    const categorySlug = basename(target);

    for (const sourcePath of walkFiles(sourceDir)) {
      if (extension && !sourcePath.endsWith(extension)) continue;
      if (!extension && extname(sourcePath).toLowerCase() !== ".json") continue;

      const asset = copyAsset({
        sourcePath,
        targetDir,
        usedNames,
      });

      lotties.push({
        ...asset,
        id: `${categorySlug}-${asset.id}`,
        category: categorySlug,
        previewBackground: /white/i.test(basename(sourcePath)) ? "dark" : "light",
      });
    }
  }

  return lotties;
}

function main() {
  if (!existsSync(sourceRoot)) {
    console.error(`HW vibe assets folder not found: ${sourceRoot}`);
    process.exit(1);
  }

  ensureDir(outputRoot);

  const categories = {};
  for (const [sourceCategory, targetCategory] of Object.entries(categoryMap)) {
    categories[targetCategory] = syncCategory(sourceCategory, targetCategory);
    console.log(
      `Synced ${categories[targetCategory].length} files → ${targetCategory}`,
    );
  }

  const lotties = syncLotties();
  console.log(`Synced ${lotties.length} lottie files`);

  const readmePath = join(sourceRoot, "READ ME.pdf");
  const manifest = {
    source: "HW vibe assets",
    sourcePath: sourceRoot,
    readme: existsSync(readmePath) ? "READ ME.pdf" : null,
    syncedAt: new Date().toISOString(),
    categories,
    lotties,
    notes: [
      "Assets are synced from the Desktop HW vibe assets folder.",
      "Re-run npm run sync:assets after updating source files.",
      "Lottie JSON files live under /assets/lotties/*.",
      "Refer to READ ME.pdf in the source folder for brand usage guidance.",
    ],
  };

  const manifestPath = join(outputRoot, "manifest.json");
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

  const readmeCopyPath = join(outputRoot, "README.pdf");
  if (existsSync(readmePath)) {
    cpSync(readmePath, readmeCopyPath);
  }

  console.log(`Wrote manifest → ${relative(projectRoot, manifestPath)}`);
}

main();
