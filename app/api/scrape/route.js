import axios from "axios";
import cheerio from "cheerio";
import connectToDatabase from "@/lib/mongodb";
import { Contents } from "@/models/scrapeSchema";

const BASE_URL = "https://hdhub4u.foo/page/";
const TOTAL_PAGES = 813;

async function processArticle(article) {
  const { url } = article;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const contentElement = $("main.page-body");
    if (!contentElement.length) {
      console.error("Content element not found for article:", article.title);
      return;
    }

    const content = contentElement
      .html()
      .replace(/HDHub4u/g, (match, offset, input) => {
        const srcIndex = input.lastIndexOf('src="', offset);

        if (srcIndex === -1 || input.indexOf('"', srcIndex + 5) < offset) {
          return "Microflix";
        } else {
          return match;
        }
      });

    const checkContentElement = $(content);
    let ratingElements;

      ratingElements = checkContentElement.find("strong").filter(function () {
        return /Rating:/i.test($(this).text());
      });
      ratingElements = checkContentElement.find("span").filter(function () {
        return /Rating:/i.test($(this).text());
      });

    var imdbRatings = ratingElements.toArray().map((ratingStrong) => {
      const parentDivText = $(ratingStrong).parents().eq(1).text().trim();
      const imdbRatingMatch = parentDivText.match(/(\d+(\.\d+)?)/);
      if (imdbRatingMatch) {
        const imdbRating = parseFloat(imdbRatingMatch[0]); // Access the matched string with [0]
        if (!isNaN(imdbRating)) {
          // Check if it's a valid number
          return imdbRating;
        } else {
          return null; // Handle case where IMDb rating is not a valid number
        }
      } else {
        return null; // Handle case where IMDb rating is not found or not in the expected format
      }
    });
    console.log(imdbRatings);
    const slug = article.title
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "_")
      .toLowerCase();

    const existingArticle = await Contents.findOne({ slug });

    if (existingArticle) {
      await Contents.updateOne(
        { url },
        {
          title: article.title,
          imdb: imdbRatings,
          url,
          slug: article.slug,
          image: article.image,
          content,
        }
      );
    } else {
      await Contents.create({
        title: article.title,
        imdb: imdbRatings,
        url,
        image: article.image,
        slug,
        content,
      });
    }
  } catch (error) {
    console.error("Error processing article:", error.message);
  }
}

async function scrapePage(pageNumber) {
  const url = `${BASE_URL}${pageNumber}/`;
  console.log(`Scraping page no. ${pageNumber}`);

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const articles = [];

    $("section.home-wrapper ul li").each((index, element) => {
      const title = $(element).find("p").text();
      const articleUrl = $(element).find("a").attr("href");
      const image = $(element).find("img[src]").attr("src");

      articles.push({ title, url: articleUrl, image });
    });

    for (const article of articles) {
      await processArticle(article);
    }
  } catch (error) {
    console.error(`Error scraping page ${pageNumber}:`, error.message);
  }
}

async function processPages(startPage = 1) {
  const pageNumbers = Array.from(
    { length: TOTAL_PAGES },
    (_, i) => startPage + i
  );

  for (const pageNumber of pageNumbers) {
    await scrapePage(pageNumber);
  }
}

async function main() {
  await connectToDatabase();

  try {
    await processPages();
    console.log("Scraping and processing completed.");
  } catch (error) {
    console.error("Error:", error.message);
    console.log("Error occurred during scraping.");
  }
}

main();
