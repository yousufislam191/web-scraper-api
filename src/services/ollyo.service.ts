import cheerio from "cheerio";
import axios from "axios";
import { JobData } from "../interfaces";

const SPREADSHEET_ID = "1cFvROarnrJYIMPBwXgNDM2wkIMVlC7-cBnuaoxHRp5o";
const SHEET_NAME = "Sheet1"; // Change to your sheet name if different

const getOllyoData = async (sheets: any) => {
  try {
    const html = await axios.get("https://jobs.ollyo.com");
    const $ = cheerio.load(html.data);
    const jobData: JobData[] = [];

    $(".job-item__card").each((index, element) => {
      const title = $(element).find(".job-list__title").text().trim();
      const metaElements = $(element).find(".job-item__meta-element");

      // Extracting data from the second span tag within each meta element
      const team = $(metaElements[0]).find("span:nth-child(2)").text().trim();
      const vacancy = $(metaElements[1])
        .find("span:nth-child(2)")
        .text()
        .trim();
      const salary = $(metaElements[2]).find("span:nth-child(2)").text().trim();
      const href = $(element).attr("href") || "";

      jobData.push({ title, team, vacancy, salary, href });
    });

    // Prepare data for Google Sheets
    const values = jobData.map((job) => [
      job.title,
      job.team,
      job.vacancy,
      job.salary,
      job.href,
    ]);

    // Write data to Google Sheets
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A2`, // Assuming A1 is for headers
      valueInputOption: "RAW",
      requestBody: {
        values,
      },
    });

    return jobData;
  } catch (error) {
    console.error("Error fetching Ollyo data:", error);
    throw new Error("Error fetching Ollyo data");
  }
};

export { getOllyoData };
