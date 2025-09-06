import { rm, mkdir, readFile, writeFile, cp } from "node:fs/promises";
import { dirname, join } from "node:path";
import fg from "fast-glob";
import { minify as minifyHtml } from "html-minifier-terser";
import { transform as esbuildTransform } from "esbuild";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const csso = require("csso");

const SRC = ".";
const OUT = "dist";

// Only include site assets
const INCLUDE = [
  "index.html",
  "css/**/*",
  "js/**/*",
  "images/**/*",
  "favicon.ico"
];

async function ensureDir(p) {
  await mkdir(dirname(p), { recursive: true });
}

async function build() {
  // clean dist
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  // collect only allowed files
  const files = await fg(INCLUDE, { dot: false });

  for (const rel of files) {
    const srcPath = join(SRC, rel);
    const outPath = join(OUT, rel);

    if (rel.endsWith(".html")) {
      const html = await readFile(srcPath, "utf8");
      const min = await minifyHtml(html, {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyCSS: true,
        minifyJS: true,
        sortAttributes: true,
        sortClassName: true
      });
      await ensureDir(outPath);
      await writeFile(outPath, min);
    } else if (rel.endsWith(".js")) {
      const js = await readFile(srcPath, "utf8");
      const { code } = await esbuildTransform(js, {
        minify: true,
        legalComments: "none",
        format: "esm",
        sourcemap: false
      });
      await ensureDir(outPath);
      await writeFile(outPath, code);
    } else if (rel.endsWith(".css")) {
      const css = await readFile(srcPath, "utf8");
      const { css: min } = csso.minify(css);
      await ensureDir(outPath);
      await writeFile(outPath, min);
    } else {
      // copy other files (images, favicon, etc.)
      await ensureDir(outPath);
      await cp(srcPath, outPath);
    }
  }

  console.log(`✓ Built ${files.length} files into ${OUT}/`);
}

build().catch((e) => {
  console.error(e);
  process.exit(1);
});