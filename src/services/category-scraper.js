import "dotenv/config";
import axios from "axios";
import * as cheerio from "cheerio";
import sleep from "../utils/sleep.js";

const sleepDuration = process.env.DELAY_BETWEEN_OPERATIONS_MS || 10000;

/**
 * Scrapes product data from a given category URL.
 * @param {string} url - The URL of the category page to scrape.
 * @param {Function} scrapeProductData - The function to scrape product data.
 * @param {Array} results - The array to store the scraped product data.
 */
const scrapeCategoryData = async (url, scrapeProductData, results) => {
  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });
    const $ = cheerio.load(data);

    const productURLs = [];
    $(".main-products.product-grid .product-layout").each((_i, el) => {
      const productURL = $(el).find(".product-thumb .image a").attr("href");
      productURLs.push(productURL);
    });

    for (const productURL of productURLs) {
      await sleep(sleepDuration);
      await scrapeProductData(productURL, results);
    }

    await sleep(sleepDuration);

    const nextPage = $(".pagination .next");

    if (nextPage.length > 0) {
      const nextPageURL = nextPage.attr("href");
      console.log("");
      console.log("♻️⠀Navigating to next page:", nextPageURL);
      console.log("");
      await scrapeCategoryData(nextPageURL, scrapeProductData, results);
    } else {
      console.log("");
      console.log("⛔ No more pages to scrape.");
      console.log("");
    }
  } catch (error) {
    throw error;
  }
};
export default scrapeCategoryData;
