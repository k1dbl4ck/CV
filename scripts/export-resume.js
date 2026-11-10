import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer";
import { render } from "../index.js";

const DEFAULT_OUTPUT = "resume-test.pdf";
const DEFAULT_RESUME = "resume-em.json";
const MAC_CHROME =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const [outputArg = DEFAULT_OUTPUT, resumeArg = DEFAULT_RESUME] =
  process.argv.slice(2);

const outputPath = path.resolve(outputArg);
const resumePath = path.resolve(resumeArg);

if (!fs.existsSync(resumePath)) {
  console.error(`Resume JSON not found: ${resumePath}`);
  process.exit(1);
}

const publicDir = path.resolve("public");
if (!fs.existsSync(path.join(publicDir, "styles", "main.css"))) {
  console.error("Compiled theme not found in public/. Run npm run build_theme first.");
  process.exit(1);
}

const resolveChromePath = () => {
  const fromEnv =
    process.env.PUPPETEER_EXECUTABLE_PATH || process.env.RESUME_CHROME_PATH;
  if (fromEnv) {
    return fromEnv;
  }
  if (process.platform === "darwin" && fs.existsSync(MAC_CHROME)) {
    return MAC_CHROME;
  }
  return undefined;
};

const htmlToDataUrl = (html) => {
  const base64 = Buffer.from(html, "utf8").toString("base64");
  return `data:text/html;base64,${base64}`;
};

const resume = JSON.parse(fs.readFileSync(resumePath, "utf8"));
const html = render(resume);

const launchOptions = {
  args: process.env.RESUME_PUPPETEER_NO_SANDBOX ? ["--no-sandbox"] : [],
};
const executablePath = resolveChromePath();
if (executablePath) {
  launchOptions.executablePath = executablePath;
}

let browser;
try {
  browser = await puppeteer.launch(launchOptions);
  const page = await browser.newPage();
  await page.emulateMediaType("screen");
  await page.goto(htmlToDataUrl(html), { waitUntil: "networkidle0" });

  const elem = await page.$("html");
  const boundingBox = await elem.boundingBox();
  const height = boundingBox.height + 1;

  await page.addStyleTag({
    content: "@page { size: auto; }",
  });

  await page.pdf({
    path: outputPath,
    height,
    printBackground: true,
  });

  console.log(`Wrote ${path.relative(process.cwd(), outputPath)}`);
} catch (err) {
  console.error("PDF export failed.");
  console.error(err.message || err);
  if (!executablePath) {
    console.error(
      "Set PUPPETEER_EXECUTABLE_PATH to a Chrome binary, or install Chrome.",
    );
  }
  process.exitCode = 1;
} finally {
  if (browser) {
    await browser.close();
  }
}
