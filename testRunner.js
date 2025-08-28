import { chromium } from "playwright";
import config from "./config.js";
import { checkProductPage } from "./helpers/checkProductPage.js";
import { checkImages } from "./helpers/checkImages.js";
import { detectErrors } from "./helpers/detectErrors.js";
import fs from "fs";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: config.viewport });

  const results = [];
  const errors = [];

  await detectErrors(page, errors);

  try {
    const response = await page.goto(config.targetUrl, {
      waitUntil: "load",
      timeout: config.timeout,
    });
    results.push(`✅ Page loaded with status ${response.status()}`);
  } catch (e) {
    errors.push(`❌ Page load error: ${e.message}`);
  }

  await checkProductPage(page, results, errors);
  await checkImages(page, results, errors);

  await browser.close();

  const report = { results, errors, testedUrl: config.targetUrl };
  fs.writeFileSync("report.json", JSON.stringify(report, null, 2));

  console.log("\n✅ Test complete. Report saved to report.json");
})();
