import axios from "axios";
import cheerio from "cheerio";
import connectToDatabase from "@/lib/mongodb";
import { Contents } from "@/models/scrapeSchema";

const BASE_URL = "https://vegamovies.dad/page/";
const TOTAL_PAGES = 991;

async function processArticle(article) {
  const { url } = article;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const contentElement = $("div.entry-content");
    if (!contentElement.length) {
      console.error("Content element not found for article:", article.title);
      return;
    }

    // Extract data-lazy-src values from img tags within p tags
    const imgDataLazySrcValues = [];
    contentElement.find("p img").each(function () {
      const dataLazySrc = $(this).attr("data-lazy-src");
      if (dataLazySrc) {
        imgDataLazySrcValues.push(dataLazySrc);
      }
    });

    // Remove p tags containing img tags
    contentElement.find("p:has(img)").remove();

    const content = contentElement
      .html()
      .replace(/Vegamovies.NL/g, (match, offset, input) => {
        const srcIndex = input.lastIndexOf('src="', offset);

        if (srcIndex === -1 || input.indexOf('"', srcIndex + 5) < offset) {
          return "Microflix";
        } else {
          return match;
        }
      });

    const checkContentElement = $(content);
    let ratingElements;

    ratingElements = checkContentElement.find("span").filter(function () {
      return /Rating:/i.test($(this).text());
    });

    var imdbRatings = ratingElements.toArray().map((ratingStrong) => {
      const parentDivText = $(ratingStrong).parents().eq(1).text().trim();
      const imdbRatingMatch = parentDivText.match(/(\d+(\.\d+)?)/);
      if (imdbRatingMatch) {
        const imdbRating = parseFloat(imdbRatingMatch[0]);
        if (!isNaN(imdbRating)) {
          return imdbRating;
        } else {
          return null;
        }
      } else {
        return null;
      }
    });

    const slug = article.title
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "_")
      .toLowerCase();

    const existingArticle = await Contents.findOne({ slug });

    if (existingArticle) {
      await Contents.updateOne(
        { slug },
        {
          title: article.title,
          imdb: imdbRatings,
          url: article.url,
          slug,
          image: article.image,
          content,
          contentSceens: imgDataLazySrcValues,
        }
      );
    } else {
      await Contents.create({
        title: article.title,
        imdb: imdbRatings,
        url: article.url,
        image: article.image,
        slug,
        content,
        contentSceens: imgDataLazySrcValues,
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

    $("article.post-item").each((index, element) => {
      const title = $(element).find("h3").text();
      const articleUrl = $(element).find("a").attr("href");
      const image = $(element).find("img").attr("data-lazy-src");

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
