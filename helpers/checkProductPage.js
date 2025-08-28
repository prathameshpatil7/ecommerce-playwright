export async function checkProductPage(page, results, errors) {
  const checks = [
    { name: "Product Title", selector: "h1" },
    { name: "Price", selector: ".price, .product-price" },
    {
      name: "Add to Cart",
      selector: 'button[type="submit"], button.add-to-cart',
    },
    { name: "Description", selector: ".description, .product-description" },
  ];

  for (const check of checks) {
    const exists = await page.$(check.selector);
    if (exists) results.push(`✅ ${check.name} found`);
    else errors.push(`❌ ${check.name} missing`);
  }

  const stockText = await page.textContent("body");
  if (/in stock|available/i.test(stockText)) {
    results.push("✅ Product appears to be in stock");
  } else {
    errors.push("⚠️ Product availability unclear");
  }

  const variantExists = await page.$("select[name*=option], .product-variants");
  if (variantExists) {
    results.push("✅ Product variants detected");
  } else {
    results.push("ℹ️ No variants detected (optional)");
  }

  const title = await page.title();
  let metaDesc = null;
  try {
    metaDesc = await page.$eval(
      'head > meta[name="description"]',
      (el) => el.content
    );
  } catch {}

  title
    ? results.push("✅ Meta title present")
    : errors.push("❌ Missing meta title");
  metaDesc
    ? results.push("✅ Meta description present")
    : errors.push("❌ Missing meta description");
}
