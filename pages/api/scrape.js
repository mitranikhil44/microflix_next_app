import axios from 'axios';
import cheerio from 'cheerio';
import cron from 'node-cron';
import { connectToDatabase } from './db';
import { Scrape } from './schema/scrapeSchema';

const BASE_URL = 'https://vegamovies.im/';
const MAX_RETRIES = 3;
const RETRY_INTERVAL = 1000;

async function fetchPageWithRetry(url) {
    let retries = 0;
    while (retries < MAX_RETRIES) {
        try {
            const response = await axios.get(url);
            return cheerio.load(response.data);
        } catch (error) {
            console.error('Error:', error.message);
            retries++;
            if (retries < MAX_RETRIES) {
                console.log(`Retrying in ${RETRY_INTERVAL / 1000} seconds...`);
                await new Promise(resolve => setTimeout(resolve, RETRY_INTERVAL));
            } else {
                console.error('Max retries reached. Abandoning request.');
                return null;
            }
        }
    }
}

async function processArticle(article) {
    try {
        const existingScrape = await Scrape.findOne({ slug: article.slug });
        const { title, url, image, content } = article;

        if (existingScrape) {
            existingScrape.content = content;
            await existingScrape.save();
        } else {
            await Scrape.create({ title, slug: article.slug, url, image, content });
        }
    } catch (error) {
        console.error('Error processing article:', error.message);
    }
}

async function fetchAndProcessArticles(pageNumber) {
    const url = `${BASE_URL}page/${pageNumber}/`;
    const $ = await fetchPageWithRetry(url);

    if ($) {
        const articles = [];

        $('article').each(async (index, element) => {
            const movieTitle = $(element).find('a').attr('title');
            const movieUrl = $(element).find('a').attr('href');
            const movieImage = "https:" + $(element).find('img').attr('data-lazy-src');
            const movieSlug = movieTitle.replace(/[^\w\s]/g, '').replace(/\s+/g, '_').toLowerCase();

            const movieContent$ = await fetchPageWithRetry(movieUrl);
            const content = movieContent$('article div.entry-content')
                .html()
                .replace(/vegamovies.nl/gi, "Microflix")
                .replace(/\/category\/english-movies/gi, "/movies/other")
                .replace(/\/category\/bollywood/gi, "/movies/indian")
                .replace(/<noscript>/gi && /<\/noscript>/, " ")

            articles.push({
                title: movieTitle,
                slug: movieSlug,
                url: movieUrl,
                image: movieImage,
                content: content,
            });
        });

        for (const article of articles) {
            await processArticle(article);
        }

        return $('.nextpostslink').length > 0;
    } else {
        console.error(`Error fetching page ${url}`);
        return false;
    }
}

async function scrapeAndProcess() {
    try {
        await connectToDatabase();
        let currentPage = 1;

        while (true) {
            const hasNextPage = await fetchAndProcessArticles(currentPage);

            if (!hasNextPage) {
                console.log('No more pages available. Exiting...');
                break;
            }

            currentPage++;
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function main() {
    try {
        await connectToDatabase();
        await scrapeAndProcess();
        cron.schedule('* */1 * * *', () => {
            // Add your cron job logic here
        }, { timezone: 'Asia/Kolkata' });
    } catch (error) {
        console.error('Main error:', error.message);
    }
}

main();
