export default {
  targetUrl:
    process.env.TARGET_URL ||
    "https://suta.in/products/laal-chumki-ready-to-wear",
  timeout: parseInt(process.env.TIMEOUT, 10) || 30000,
  viewport: { width: 1920, height: 1080 },
};
