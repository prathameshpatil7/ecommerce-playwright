# 🧪 Ecommerce Test Automation Tool

Automated browser tests for Shopify/BigCommerce product pages using Playwright.

## ✅ Features

- Product page element validation (title, price, variants)
- Image load checks (status, alt-text, lazy-load, size)
- Error detection (JS errors, network failures, CORS, security)
- Meta info validation

## 🚀 How to Run

```bash
npm install
TARGET_URL=https://yourstore.com/products/example npm test
```

## 🧾 Output

Generates `report.json` containing test results and errors.

## 🔧 Config

Edit `config.js` or use environment variables:

- `TARGET_URL` – product page to test
- `TIMEOUT` – page timeout in ms

### Acceptance Criteria

| Requirement                        | Status             |
| ---------------------------------- | ------------------ |
| Product title/price/cart           | ✅ Done            |
| Product description, variants      | ✅ Done            |
| Image loading, alt-text, lazy-load | ✅ Done            |
| Meta title & description           | ✅ Done            |
| Console/network/resource errors    | ✅ Done            |
| JSON Report                        | ✅ Done            |
| Cloud-ready (CI/CD)                | ✅ DONE            |
