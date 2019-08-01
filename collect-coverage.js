const path = require("path");
const puppeteer = require("puppeteer");
const ptoi = require("puppeteer-to-istanbul");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.coverage.startCSSCoverage();
  await page.goto(`file:///${path.join(__dirname, "example.html")}`);
  const coverage = await page.coverage.stopCSSCoverage();
  ptoi.write(coverage);

  coverage.forEach(({ text, ranges }) => {
    const covered = ranges
      .map(({ start, end }) => text.substring(start, end))
      .join("");
    console.log("covered:", covered);
  });

  await browser.close();
})();
