import axios from "axios";
import cheerio from "cheerio";
import connectToDatabase from "@/lib/mongodb";
import { Contents } from "@/models/scrapeSchema";

const BASE_URL = "https://dotmovies.bet/page/";
const TOTAL_PAGES = 283;

const scrapeCode = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error during scraping:', error.message);
    throw new Error('Failed to fetch data from the provided URL');
  }
};

// Function to scrape IMDb details from a given IMDb URL
const scrapeImdbDetails = async (url) => {
  try {
    const contentLink = `https://www.imdb.com${url}`;
    const linkData = await scrapeCode(contentLink);
    const $ = cheerio.load(linkData);

    // Create an object to store the desired properties
    const imdbDetails = {};

    // Scrape IMDb rating
    const imdbRatingText = $("div span.ipc-btn__text div div.dLwiNw").text().trim();
    const ratingRegex = /(\d+\.\d+\/\d+(\.\d+)?[MK]?)/;
    const match = imdbRatingText.match(ratingRegex);

    if (match) {
      imdbDetails.imdbRating = match[0];
    } else {
      throw new Error('IMDb rating not found');
    }

    // Scrape IMDb genres and details
    imdbDetails.imdbGenres = $('div a.ipc-chip--on-baseAlt span').map((_, el) => $(el).text()).get();
    imdbDetails.details = $("section[data-testid='Details'] div[data-testid='title-details-section'] li").map((_, el) => $(el).text().trim()).get();

    return imdbDetails;
  } catch (error) {
    console.error('Error during IMDb scraping:', error.message);
    throw error; // Rethrow the error for the caller to handle
  }
};

// Function to search IMDb and get IMDb links for a given query
const searchIMDb = async (query) => {
  try {
    const url = `https://www.imdb.com/find?q=${query}&s=all`;
    const scrapeData = await scrapeCode(url);
    const $ = cheerio.load(scrapeData);

    const results = $('li.find-result-item').map((_, element) => $(element).find("a").attr("href")).get();
    return results;
  } catch (error) {
    console.error('Error during IMDb search:', error.message);
    throw new Error('Failed to perform IMDb search');
  }
};

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
  
      // Search IMDb and update the database for each title and slug
      const fetchData = async () => {
          // Process the slug to create a search query
          let processedSlug = slug.replace(/download+/ig, "").replace(/_/g, " ");
          const match = processedSlug.match(/(?:download\s+)?(.+?\d{4}).*$/);
  
          if (match) {
            processedSlug = match[1].trim();
          }
  
          processedSlug = processedSlug.replace(/hindi.*$/i, "").replace(/english.*$/, "").replace(/korean.*$/, "").trim();
  
          const link = await searchIMDb(processedSlug);
  
          if (link && link.length > 0) {
            const imdbDetails = await scrapeImdbDetails(link[0]);  
            return imdbDetails;
          } else {
            return null;
          }
        }

      const imdbdata = await fetchData();

    const existingArticle = await Contents.findOne({ url });

    if (existingArticle) {
      await Contents.updateOne(
        { url },
        {
          title: article.title,
          imdb: imdbRatings,
          url: article.url,
          slug,
          image: article.image,
          content,
          contentSceens: imgDataLazySrcValues,
          imdbDetails: {
            imdbRating: imdbdata.imdbRating,
            imdbGenres: imdbdata.imdbGenres,
            details: imdbdata.details,
          },
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
        imdbDetails: {
          imdbRating: imdbdata.imdbRating,
          imdbGenres: imdbdata.imdbGenres,
          details: imdbdata.details,
        },

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
