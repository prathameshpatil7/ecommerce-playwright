export async function detectErrors(page, errors) {
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      errors.push(`❌ Console error: ${msg.text()}`);
    }
  });

  page.on("pageerror", (err) => {
    errors.push(`❌ Uncaught exception: ${err.message}`);
  });

  page.on("response", (response) => {
    const status = response.status();
    if (status >= 400) {
      errors.push(`❌ Network error: ${response.url()} -> ${status}`);
    }
  });

  page.on("requestfailed", (request) => {
    errors.push(`❌ Request failed: ${request.url()}`);
  });
}
