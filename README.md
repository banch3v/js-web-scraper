# js-web-scraper

**js-web-scraper** is a simple tool for scraping product data from a given category URL or multiple URLs and exporting the results as a `.csv` file.

## Usage

1. Clone the repository:

   ```bash
   git clone <repo-url>
   ```

2. Install dependencies:

   ```bash
   yarn install
   # or
   npm install
   ```

3. Create a `.env` file and set the target category URL and sleeper time to reduce the change of getting flagged:

   ```
   WEBSITE_CATEGORY_URLS="https://example.com/category1,https://example.com/category2,https://example.com/category3"
   DELAY_BETWEEN_OPERATIONS_MS=10000
   ```

4. Adjust the logic in `product-scraper.js` and `category-scraper.js` as needed.

5. Run the scraper:

   ```bash
   node ./src/index.js
   ```

   Or run it with the **VS Code Code Runner** extension (my preferred method).

   To keep a log you can review later, run:

   ```bash
   node ./src/index.js 2>&1 | tee scraper.log
   ```

   This will create a `scraper.log` file in the project root while still showing live logs in the terminal.

## Notes

- Be careful not to get flagged by the website you're trying to scrape.
- Using a **VPN** is highly recommended and can help if the target site blocks your requests.
- Some hosts block by **IP**, others by **DNS**, third both. If flagged, first change your IP and try flushing your DNS cache:
  - **Ubuntu:** `sudo resolvectl flush-caches`
  - **Windows:** `ipconfig /flushdns`
- The current setup includes delays and browser-like headers to reduce blocking.  
  If you add operations that send requests too quickly, use a **sleeper** function (found in `./src/utils`) to slow them down.
- Running the project in GitHub Codespaces is also an option, in case you don't have a VPN
