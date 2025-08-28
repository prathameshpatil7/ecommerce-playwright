import config from "../config.js";

export async function checkImages(page, results, errors) {
  const images = await page.$$("img");
  results.push(`ℹ️ Found ${images.length} images on page`);

  for (const img of images) {
    const src = await img.getAttribute("src");
    const alt = await img.getAttribute("alt");
    const box = await img.boundingBox();

    if (!src || src.startsWith("data:")) continue;

    try {
      const absoluteUrl = new URL(src, config.targetUrl).href;
      const response = await page.request.get(absoluteUrl);
      if (response.status() !== 200) {
        errors.push(`❌ Broken image (${response.status()}): ${absoluteUrl}`);
      }
    } catch {
      errors.push(`❌ Could not fetch image: ${src}`);
    }

    if (!alt) errors.push(`⚠️ Missing alt text: ${src}`);
    if (box && (box.width < 50 || box.height < 50)) {
      errors.push(`⚠️ Image too small: ${src} (${box.width}x${box.height})`);
    }
  }

  // Scroll gradually for lazy loading
  const scrollSteps = 5;
  for (let i = 0; i < scrollSteps; i++) {
    await page.evaluate((step) => {
      window.scrollTo(0, (document.body.scrollHeight * (step + 1)) / 5);
    }, i);
    await page.waitForTimeout(1000);
  }

  const lazyImages = await page.$$('img[loading="lazy"]');
  results.push(`✅ Detected ${lazyImages.length} lazy-loaded images`);
}
