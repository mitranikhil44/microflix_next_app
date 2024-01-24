import axios from "axios";
import cheerio from "cheerio";
import connectToDatabase from "@/lib/mongodb";
import { Contents } from "@/models/scrapeSchema2";

const BASE_URL = "https://dotmovies.rsvp/page/";
const TOTAL_PAGES = 284;

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

    const imdbDetails = {
      imdbRating: { rating: null, votes: null },
      imdbGenres: null,
      formattedDate: null,
      formattedDateObject: null,
      countryOfOrigin: null,
      officialSite: null,
      language: null,
      alsoKnownAs: null,
      filmingLocations: null,
      productionCompanies: null,
    };

    // Scrape IMDb rating
    const imdbRatingText = $("div.eWQwwe div.dLwiNw").text().trim();
    const match = imdbRatingText.match(/([\d.]+)\/10\s*(\d{3})/);

    if (match) {
      imdbDetails.imdbRating.rating = match[1];
      imdbDetails.imdbRating.votes = match[2];
    } else {
      console.log("No IMDb rating data available");
    }

    // Scrape IMDb genres
    const collectGenres = $('div a.ipc-chip--on-baseAlt span').map((_, el) => $(el).text().trim()).get();
    imdbDetails.imdbGenres = collectGenres.length ? collectGenres.join(", ") : null;

    // Scrape details
    const details = $("section[data-testid='Details'] div[data-testid='title-details-section'] li").map((_, el) => $(el).text().trim()).get();

    // Scrape Release date
    const releaseDateRegex = /^Release date(.+)$/i;
    const formattedDateMatch = details.find((detail) => releaseDateRegex.test(detail));
    if (formattedDateMatch) {
      const formattedDate = releaseDateRegex.exec(formattedDateMatch)[1].trim();
      const dateObject = new Date(formattedDate);
      imdbDetails.formattedDate = formattedDate;
      imdbDetails.formattedDateObject = `${dateObject.getDate()}-${dateObject.getMonth() + 1}-${dateObject.getFullYear()}`;
    } else {
      console.log("No Release date information available");
    }

    // Process other details
    let countryOfOrigin = null;
    let officialSite = null;
    let language = null;
    let alsoKnownAs = null;
    let filmingLocations = null;
    let productionCompanies = null;
    for (let i = 2; i < details.length - 1; i++) {
      const currentDetail = details[i];
      const nextDetail = details[i + 1];
      if (
        currentDetail.startsWith("Country of origin") &&
        !nextDetail.startsWith("Country of origin")
      ) {
        countryOfOrigin = nextDetail.trim();
      } else if (
        currentDetail.startsWith("Official site") &&
        !nextDetail.startsWith("Official site")
      ) {
        officialSite = nextDetail.trim();
      } else if (
        currentDetail.startsWith("Language") &&
        !nextDetail.startsWith("Language")
      ) {
        language = nextDetail.trim();
      } else if (
        currentDetail.startsWith("Also known as") &&
        !nextDetail.startsWith("Also known as")
      ) {
        alsoKnownAs = nextDetail.trim();
      } else if (
        currentDetail.startsWith("Filming locations") &&
        !nextDetail.startsWith("Filming locations")
      ) {
        filmingLocations = nextDetail.trim();
      } else if (
        currentDetail.startsWith("Production companies") &&
        !nextDetail.startsWith("Production companies")
      ) {
        productionCompanies = nextDetail.trim();
      }
    }
    imdbDetails.countryOfOrigin = countryOfOrigin;
    imdbDetails.officialSite = officialSite;
    imdbDetails.language = language;
    imdbDetails.alsoKnownAs = alsoKnownAs;
    imdbDetails.filmingLocations = filmingLocations;
    imdbDetails.productionCompanies = productionCompanies;

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

function extractSearchableContent(contentTextArray) {
  const findContent = {
    name: '',
    year: '',
  };

  if (contentTextArray.length > 0) {
    const contentText = contentTextArray.join(' '); // Combine array into a single string
    const nameMatch = contentText.match(/(?:movie|show|series|full)\s*name:*(.*)/i);
    const yearMatch = contentText.match(/(?:released\s*year:)?\s*(\d{4})/i);

    if (nameMatch) {
      findContent.name = nameMatch[1].trim();
    }

    if (yearMatch) {
      findContent.year = yearMatch[1].trim();
    }

    if (!nameMatch && !yearMatch) {
      console.log("No match found for Movie Name and Released Year");
    }
  } else {
    console.log("No p elements found");
  }

  const searchableContent = findContent.name + " " + findContent.year;
  return searchableContent;
}


async function processArticle(article) {
  const { url, title, image } = article;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const contentElement = $("div.entry-content");
    if (!contentElement.length) {
      console.error("Content element not found for article:", title);
      return;
    }

    // Extract data-lazy-src values from img tags within p tags
    const imgDataLazySrcValues = contentElement.find("p img")
      .map((_, elem) => $(elem).attr("data-lazy-src"))
      .get();

    const slug = title.replace(/[^\w\s]/g, "").replace(/\s+/g, "_").toLowerCase();

    const contentTextArray = contentElement.find("p")
      .map((_, e) => $(e).text().toLowerCase())
      .get();

    const searchableContent = extractSearchableContent(contentTextArray);

    // Search IMDb and get details
    const imdbData = await getIMDbDetails(searchableContent);
    
    // Remove p tags containing img tags
    contentElement.find("p:has(img)").remove();

    const content = contentElement.html()
      .replace(/Vegamovies.NL/g, (match, offset, input) => {
        const srcIndex = input.lastIndexOf('src="', offset);

        if (srcIndex === -1 || input.indexOf('"', srcIndex + 5) < offset) {
          return "Microflix";
        } else {
          return match;
        }
      });

    // Update or create database entry
    await updateOrCreateDatabaseEntry({ url, title, image, slug, content, imgDataLazySrcValues, imdbData });
  } catch (error) {
    console.error("Error processing article:", error.message);
  }
}

async function getIMDbDetails(searchableContent) {
  try {
    const imdbLinks = await searchIMDb(searchableContent);

    if (imdbLinks && imdbLinks.length > 0) {
      return await scrapeImdbDetails(imdbLinks[0]);
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching IMDb details:', error.message);
    return null;
  }
}

async function updateOrCreateDatabaseEntry({ url, title, image, slug, content, imgDataLazySrcValues, imdbData }) {
  try {
    const existingArticle = await Contents.findOne({ url });

    if (existingArticle) {
      await Contents.updateOne(
        { url },
        {
          title,
          url,
          image,
          slug,
          content,
          contentSceens: imgDataLazySrcValues,
          imdbDetails: imdbData || null,
        }
      );
    } else {
      await Contents.create({
        title,
        url,
        image,
        slug,
        content,
        contentSceens: imgDataLazySrcValues,
        imdbDetails: imdbData || null,
      });
    }
  } catch (error) {
    console.error("Error updating/creating database entry:", error.message);
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
      const image = $(element).find("img").attr("data-src");
      articles.push({ title, url: articleUrl, image });
    });

    for (const article of articles) {
      await processArticle(article);
    }
  } catch (error) {
    console.error(`Error scraping page ${pageNumber}:`, error.message);
  }
}

async function processPages(startPage = 284) {
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
