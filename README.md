# CV

A self-contained JSON Resume pipeline: Handlebars/Sass themes compile to HTML, then Puppeteer prints a PDF from a resume JSON file.

Content lives in `resume-*.json`. Layout lives in `themes/`. Compiled output is `public/` (gitignored). PDFs are gitignored too.

## Requirements

- Node.js 18+
- Google Chrome at `/Applications/Google Chrome.app` (macOS) for PDF export

## Setup

```bash
./setup.sh
```

That checks for Chrome and runs `npm install`. Chromium is not downloaded; export uses the system Chrome binary.

## Build a theme

Themes are folders under `themes/`. Gulp compiles one theme at a time into `public/`.

```bash
npm run build_theme
npm run build_theme -- split-column-layout
npm run build_theme -- single-column-layout
```

The default theme is `split-column-layout`.

To add a theme, copy an existing folder:

```bash
cp -R themes/split-column-layout themes/my-theme
npm run build_theme -- my-theme
```

Brand colors and the optional three-stop top bar are in that theme’s `styles/utils/_variables.scss`.

## Export a PDF

Compile a theme first, then export. The renderer reads the compiled files in `public/`.

```bash
npm run build_theme -- split-column-layout
npm run build_resume -- resume-sample.pdf resume-sample.json
```

`resume-sample.json` is a dummy software-engineer resume you can copy. Arguments are output path then resume JSON. If you omit them, the script defaults to `resume-test.pdf` and `resume-em.json`.

Override Chrome with `PUPPETEER_EXECUTABLE_PATH` if needed. `build_resume` already points at the macOS Chrome binary.

## Resume data

JSON files follow [JSON Resume](https://jsonresume.org/schema/) plus a few extras used by these themes:

| Field | Purpose |
| --- | --- |
| `skills[].group` | `"core"` or `"worked-with"` — split-column renders **Core Skills** and **Worked with**. Ungrouped skills go under Worked with. |
| `hobbies` | String array for the Hobbies sidebar (split-column). |

HTML in highlight strings (for example `<b>…</b>`) is rendered as markup in the work section.

## Layout

```
themes/<name>/          Theme source (styles, Handlebars views)
public/                 Compiled theme (generated)
index.js                JSON Resume `render(resume)` entry used for PDF
scripts/export-resume.js  Puppeteer PDF export
resume-*.json           Resume content
```
