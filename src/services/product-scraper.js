import axios from "axios";
import * as cheerio from "cheerio";
import extractImgFromSrcset from "../utils/extract-img-from-srcset.js";

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

    const productTitle = $(".product_title.entry-title.wd-entities-title")
      .text()
      .trim();

    const images = [];
    $(".wd-gallery-thumb .wd-carousel-wrap img").each((_i, el) => {
      const img = $(el);
      const raw =
        img.attr("data-srcset") ||
        img.attr("srcset") ||
        img.attr("data-src") ||
        img.attr("src") ||
        "";
      let imageUrl = extractImgFromSrcset(raw) || raw || "";
      if (!imageUrl) return;
      if (imageUrl.startsWith("//")) imageUrl = "https:" + imageUrl;
      try {
        imageUrl = new URL(imageUrl, url).href;
      } catch (e) {
        // leave as-is if parsing fails
      }
      if (imageUrl && !images.includes(imageUrl)) images.push(imageUrl);
    });

    // const shortDescription = [];
    // $(".product-info .short_description .shortDesc p").each((_i, el) => {
    //   shortDescription.push($(el).text().trim());
    // });

    const brand = $(".product_meta .posted_in").filter((i, el) => {
      const label = $(el).find(".meta-label").text().trim().toLowerCase();
      if (label.includes("марка")) {
        return $(el).find("a").text().trim();
      } else return "";
    });

    const techData = {};
    $(`.woocommerce-product-attributes tbody tr`).each((_i, el) => {
      const specTitle = $(el).find("td").first().text().trim();
      const specValue = $(el).find("td").last().text().trim();

      techData[specTitle] = specValue;
    });

    results.push({
      productTitle,
      // shortDescription: shortDescription.join("\n"),
      brand,
      images,
      ...techData,
    });
    console.log("📝 Product scraped successfully:", productTitle);
  } catch (error) {
    throw error;
  }
};

export default scrapeProductData;
