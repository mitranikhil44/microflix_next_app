import puppeteer from 'puppeteer';
import connectToDatabase from './database/db'; // Import the connectToDatabase function

import { Hollywood, Bollywood } from './database/models';

export default async function handler(req, res) {
    const BASE_URLS = {
        Hollywood: 'https://vegamovies.im/page/',
        Bollywood: 'https://dotmovies.skin/page/',
    };

    const ARTICLE_SELECTOR = 'article';

    const TOTAL_PAGES = {
        Hollywood: 987,
        Bollywood: 267,
    };


    (async () => {
        setTimeout(async() => {
            await connectToDatabase(); // Call the connectToDatabase function to establish the MongoDB connection
            const browser = await puppeteer.launch();
            let scrapingStatus = ''; // Variable to store scraping status

            async function scrapeModel(baseUrl, Model, totalPages) {
                for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
                    const url = `${baseUrl}${pageNumber}/`;
                    scrapingStatus = `Scraping page no. ${pageNumber}`;
                    try {
                        const page = await browser.newPage();
                        await page.goto(url, { waitUntil: 'domcontentloaded' });

                        const articles = await page.$$eval(ARTICLE_SELECTOR, (elements) =>
                            elements.map((element) => {
                                const title = element.querySelector('a').getAttribute('title');
                                const url = element.querySelector('a').getAttribute('href');
                                const imageElement = element.querySelector('img[data-lazy-src]');
                                const image = imageElement ? 'https:' + imageElement.getAttribute('data-lazy-src') : '';
                                const slug = title.replace(/[^\w\s]/g, '').replace(/\s+/g, '_').toLowerCase();

                                return { title, url, image, slug };
                            })
                        );

                        await page.close();

                        await Promise.all(
                            articles.map(async (article) => {
                                const { url } = article;
                                try {
                                    const page = await browser.newPage();
                                    await page.goto(url, { waitUntil: 'domcontentloaded' });

                                    const content = await page.$eval('div.entry-content', (element) => element.innerHTML);
                                    const existingArticle = await Model.findOne({ url });

                                    const transformedContent = content
                                        .replace(/vegamovies.nl/gi, 'Microflix')
                                        .replace(/\/category\/english-movies/gi, '/movies/other')
                                        .replace(/\/category\/bollywood/gi, '/movies/indian')
                                        .replace(/<noscript>/gi, '')
                                        .replace(/<\/noscript>/gi, '');

                                    if (existingArticle) {
                                        existingArticle.title = article.title;
                                        existingArticle.image = article.image;
                                        existingArticle.slug = article.slug;
                                        existingArticle.content = transformedContent;
                                        await existingArticle.save();
                                    } else {
                                        const newArticle = new Model({
                                            title: article.title,
                                            url,
                                            image: article.image,
                                            slug: article.slug,
                                            content: transformedContent,
                                        });

                                        await newArticle.save();
                                    }

                                    await page.close();
                                } catch (error) {
                                    console.error('Error processing article:', error.message);
                                }
                            })
                        );
                    } catch (error) {
                        console.error(`Error scraping page ${pageNumber}:`, error.message);
                    }
                }
            }

            try {
                // Parallelize the scraping of Hollywood and Bollywood pages
                await Promise.all([
                    scrapeModel(BASE_URLS.Hollywood, Hollywood, TOTAL_PAGES.Hollywood),
                    scrapeModel(BASE_URLS.Bollywood, Bollywood, TOTAL_PAGES.Bollywood),
                ]);

                // Send a response after scraping is completed
                res.status(200).send(`Scraping and processing completed. ${scrapingStatus}`);
            } catch (error) {
                console.error('Error:', error.message);
                res.status(404).send('Error occurred during scraping.');
            } finally {
                await browser.close();
            }
        }, 2000);
    })();
}
