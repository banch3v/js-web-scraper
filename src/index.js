import "dotenv/config";
import scrapeProductData from "./services/product-scraper.js";
import scrapeCategoryData from "./services/category-scraper.js";
import generateScrapedDataCSV from "./services/csv-generator.js";
import executionTimeLog from "./utils/execution-time.js";
import parseEnvCategoryUrls from "./utils/parse-env-data.js";

const URLS = process.env.WEBSITE_CATEGORY_URLS;

if (!URLS) {
  console.error(
    "⚠️ WEBSITE_CATEGORY_URLS is not set. Please provide it in a .env file."
  );
  process.exit(1);
}

const CATEGORY_ARRAY = parseEnvCategoryUrls(URLS);

console.log(CATEGORY_ARRAY);

async function main() {
  for (const cluster of CATEGORY_ARRAY) {
    const results = [];
    const startDate = new Date();
    for (const URL of cluster) {
      console.log("🚀 Starting new scraping for category URL:", URL, "\n");
      try {
        await scrapeCategoryData(URL, scrapeProductData, results);
      } catch (error) {
        console.error("Scraping failed:", error);
        process.exit(1);
      }
    }
    generateScrapedDataCSV(results);
    const endDate = new Date();
    executionTimeLog(startDate, endDate, cluster);
  }
}

main();
