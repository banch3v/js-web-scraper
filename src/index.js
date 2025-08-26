import "dotenv/config";
import scrapeProductData from "./services/product-scraper.js";
import scrapeCategoryData from "./services/category-scraper.js";
import generateScrapedDataCSV from "./services/csv-generator.js";

const BASE_URL = process.env.WEBSITE_CATEGORY_URL;

if (!BASE_URL) {
  console.error(
    "⚠️ WEBSITE_CATEGORY_URL is not set. Please provide it in a .env file."
  );
  process.exit(1);
}

async function main() {
  const results = [];
  try {
    await scrapeCategoryData(BASE_URL, scrapeProductData, results);
    generateScrapedDataCSV(results);
  } catch (error) {
    console.error("Scraping failed:", error);
    process.exit(1);
  }
}

main();
