import "dotenv/config";
import scrapeProductData from "./services/product-scraper.js";
import scrapeCategoryData from "./services/category-scraper.js";
import generateScrapedDataCSV from "./services/csv-generator.js";
import executionTimeLog from "./utils/execution-time.js";

const URLS = process.env.WEBSITE_CATEGORY_URLS;

if (!URLS) {
  console.error(
    "⚠️ WEBSITE_CATEGORY_URLS is not set. Please provide it in a .env file."
  );
  process.exit(1);
}

const URLS_ARRAY = URLS.split(",").map((url) => url.trim());

console.log(URLS_ARRAY);

async function main() {
  for (const URL of URLS_ARRAY) {
    const results = [];
    try {
      await scrapeCategoryData(URL, scrapeProductData, results);
      generateScrapedDataCSV(results);
    } catch (error) {
      console.error("Scraping failed:", error);
      process.exit(1);
    }
  }
}

main();
