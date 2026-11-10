import fs from "node:fs";
import path from "node:path";

const DEFAULT_THEME = "split-column-layout";
const theme = process.env.THEME || DEFAULT_THEME;

if (/[\\/]/.test(theme) || theme === "." || theme === "..") {
  throw new Error(`Invalid theme name "${theme}"`);
}

const srcRoot = path.join("themes", theme);

if (!fs.existsSync(srcRoot)) {
  throw new Error(`Unknown theme "${theme}" (looked for ${srcRoot})`);
}

export const src = {
  root: srcRoot,
  styles: `${srcRoot}/styles/*.scss`,
  stylesAll: `${srcRoot}/styles/**/*.scss`,
  views: `${srcRoot}/views/**/*.hbs`,
  hbs: `${srcRoot}/**/*.hbs`,
  images: `${srcRoot}/images/**/*`,
  extras: `${srcRoot}/*.*`,
  js: `${srcRoot}/js/**/*.js`,
};

export const dest = {
  root: "public",
  styles: "public/styles",
  images: "public/images",
};

export { DEFAULT_THEME, theme };
