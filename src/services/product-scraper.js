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

    // Extract product title
    const productTitle = $(".single-product-name").text().trim();

    // Extract product short description
    const shortDescription = $(".single-product-list-characteristics")
      .text()
      .trim();

    // Extract product brand
    // const brand = $(".product-manufacturer a").text().trim();

    // Extract product technical characteristics
    const techData = {};
    let wasPrevRowEmpty = false;
    let techSpecNameOne = "";
    let techSpecNameTwo = "";
    $(`.technical-characteristics table tr`).each((i, el) => {
      const tdsArray = $(el).children("td, th");

      if (tdsArray.length < 3) {
        console.warn(
          `⚠️ ${productTitle} table row has less than 3 columns, skipping.`
        );
        return;
      }

      if (tdsArray.length === 3) {
        if (i === 0) return; // skip first header row
        if (wasPrevRowEmpty) return; // skip rows after empty row (headings)

        const specTitle = tdsArray.eq(0).text().trim() || "";
        const specSymbol = tdsArray.eq(1).text().trim() || "";
        const specValue = tdsArray.eq(2).text().trim() || "";

        if (!specTitle && !specSymbol && !specValue) {
          wasPrevRowEmpty = true; // empty row
          return;
        }

        const specTitleAndSymbol = specSymbol
          ? `${specTitle} (${specSymbol})`.trim()
          : specTitle;
        techData[specTitleAndSymbol] = specValue;
        wasPrevRowEmpty = false;
        return;
      }

      if (tdsArray.length === 4) {
        const specTitle = tdsArray.eq(0).text().trim() || "";
        const specSymbol = tdsArray.eq(1).text().trim() || "";
        const specValue1 = tdsArray.eq(2).text().trim() || "";
        const specValue2 = tdsArray.eq(3).text().trim() || "";

        if (i === 0) {
          techSpecNameOne = specValue1;
          techSpecNameTwo = specValue2;
          return; // skip header row
        }

        if (!specTitle && !specSymbol && !specValue1 && !specValue2) {
          wasPrevRowEmpty = true;
          return; // empty row
        }

        if (wasPrevRowEmpty) {
          techSpecNameOne = specValue1;
          techSpecNameTwo = specValue2;
          wasPrevRowEmpty = false;
          return;
        }

        const specTitleAndSymbol = specSymbol
          ? `${specTitle} (${specSymbol})`.trim()
          : specTitle;
        techData[`${specTitleAndSymbol} ${techSpecNameOne}`] = specValue1;

        if (specValue2) {
          techData[`${specTitleAndSymbol} ${techSpecNameTwo}`] = specValue2;
        }
        wasPrevRowEmpty = false;
        return;
      }
    });

    results.push({
      productTitle,
      shortDescription,
      // brand,
      ...techData,
    });
    console.log("📝 Product scraped successfully:", productTitle);
  } catch (error) {
    throw error;
  }
};

export default scrapeProductData;
