import "dotenv/config";
import scrapeProductData from "./services/product-scraper.js";
import scrapeCategoryData from "./services/category-scraper.js";
import generateScrapedDataCSV from "./services/csv-generator.js";
import executionTimeLog from "./utils/execution-time.js";

const urls =
  "https://technogroup.bg/brand/aeg/, https://technogroup.bg/brand/ariston/, https://technogroup.bg/brand/atlantic/, https://technogroup.bg/brand/aux/, https://technogroup.bg/brand/bosch/, https://technogroup.bg/brand/crystal/, https://technogroup.bg/brand/daikin/, https://technogroup.bg/brand/eldom/, https://technogroup.bg/brand/electrolux/, https://technogroup.bg/brand/fuji-electric/, https://technogroup.bg/brand/fujitsu/, https://technogroup.bg/brand/general-fujitsu/, https://technogroup.bg/brand/gorenje/, https://technogroup.bg/brand/gree/, https://technogroup.bg/brand/gree-versati/, https://technogroup.bg/brand/hitachi/, https://technogroup.bg/brand/innova/, https://technogroup.bg/brand/liebherr/, https://technogroup.bg/brand/liebherr-professional/, https://technogroup.bg/brand/midea/, https://technogroup.bg/brand/mitsubishi-electric/, https://technogroup.bg/brand/mitsubishi-electric-ecodan/, https://technogroup.bg/brand/mitsubishi-heavy/, https://technogroup.bg/brand/mitsubishi-heavy-hydrolution/, https://technogroup.bg/brand/nippon/, https://technogroup.bg/brand/olimpia-splendid/, https://technogroup.bg/brand/sabiana/, https://technogroup.bg/brand/teka/, https://technogroup.bg/brand/tesy/, https://technogroup.bg/brand/toshiba/, https://technogroup.bg/brand/toshiba-estia/, https://technogroup.bg/brand/treo/, https://technogroup.bg/brand/whirlpool/, https://technogroup.bg/brand/yamato-invertorni-klimatitsi/";

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
    console.log("🚀 Starting new scraping for category URL:", URL, "\n");
    const results = [];
    const startDate = new Date();
    try {
      await scrapeCategoryData(URL, scrapeProductData, results);
      generateScrapedDataCSV(results);
      const endDate = new Date();
      executionTimeLog(startDate, endDate, URL);
    } catch (error) {
      console.error("Scraping failed:", error);
      process.exit(1);
    }
  }
}

main();
