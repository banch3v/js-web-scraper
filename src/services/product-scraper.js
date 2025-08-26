import axios from "axios";
import * as cheerio from "cheerio";

/**
 * Scrapes product data from a given URL.
 * @param {string} url - The URL of the product page to scrape.
 * @param {Array} results - The array to store scraped data.
 */
const scrapeProductData = async (url, results) => {
  try {
    console.log("⌛️ Initiate scraping product:", url);
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });
    const $ = cheerio.load(data);

    const productTitle = $(".product-details .title.page-title").text().trim();

    const shortDescription = [];
    $(".product-info .short_description .shortDesc p").each((_i, el) => {
      shortDescription.push($(el).text().trim());
    });

    const brand = $(".product-manufacturer a").text().trim();

    const techData = {};
    $(`.table.table-bordered tbody tr`).each((_i, el) => {
      const specTitle = $(el).find("td").first().text().trim();
      const specValue = $(el).find("td").last().text().trim();

      techData[specTitle] = specValue;
    });

    results.push({
      productTitle,
      shortDescription: shortDescription.join("\n"),
      brand,
      ...techData,
    });
    console.log("📝 Product scraped successfully:", productTitle);
  } catch (error) {
    throw error;
  }
};

export default scrapeProductData;
