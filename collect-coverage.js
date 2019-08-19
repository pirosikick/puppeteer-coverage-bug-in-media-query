const path = require("path");
const puppeteer = require("puppeteer");
const pti = require("puppeteer-to-istanbul");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.coverage.startCSSCoverage();
  await page.goto(`file:///${path.join(__dirname, "example.html")}`);
  const coverage = await page.coverage.stopCSSCoverage();
  pti.write(coverage);

  coverage.forEach(({ text, ranges }) => {
    const covered = ranges
      .map(({ start, end }) => text.substring(start, end))
      .join("");
    console.log("covered:");
    console.log(covered);
  });

  await browser.close();
})();
