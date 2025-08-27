/**
 * Calculates and logs the execution time of a process by given start and end dates.
 * @param {Date} startDate - The start date of the process.
 * @param {Date} endDate - The end date of the process.
 * @param {string} url - The URL being processed.
 * @returns {void} - No return value. Only logs the execution time.
 */

const executionTimeLog = (startDate, endDate, url) => {
  const timeDiff = endDate - startDate; // in ms
  const seconds = Math.floor((timeDiff / 1000) % 60);
  const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
  const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
  console.log("");
  console.log(
    `✅ Scraping ${url} completed in ${hours}h ${minutes}m ${seconds}s`
  );
  console.log("");
};

export default executionTimeLog;
