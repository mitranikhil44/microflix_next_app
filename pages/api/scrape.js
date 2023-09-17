// import puppeteer from 'puppeteer';
// import connectToDatabase from './database/db'; // Import the connectToDatabase function
// import { Adult, Hollywood, Bollywood } from './database/models';

// const BASE_URLS = {
//   Hollywood: 'https://vegamovies.im/page/',
//   Bollywood: 'https://dotmovies.skin/page/',
//   // Adult: 'https://xprimehub.pro/page/',
// };

// const ARTICLE_SELECTOR = 'article';

// const TOTAL_PAGES = {
//   Hollywood: 987,
//   Bollywood: 267,
//   // Adult: 161,
// };

// (async () => {
//   await connectToDatabase(); // Call the connectToDatabase function to establish the MongoDB connection
//   const browser = await puppeteer.launch();
//   let scrapingStatus = ''; // Variable to store scraping status

//   // Function to generate unique slug with a unique identifier
//   function generateUniqueSlug(slug, index) {
//     return `${slug}_${index}`;
//   }

//   async function scrapeModel(baseUrl, Model, totalPages, imageAttribute) {
//     for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
//       const url = `${baseUrl}${pageNumber}/`;
//       scrapingStatus = `Scraping page no. ${pageNumber}`;
//       console.log(scrapingStatus);
//       try {
//         const page = await browser.newPage();
//         await page.goto(url, { waitUntil: 'domcontentloaded' });

//         const articles = await page.$$eval(
//           ARTICLE_SELECTOR,
//           (elements, imageAttr) => {
//             return elements.map((element) => {
//               const title = element.querySelector('a').getAttribute('title');
//               const articleUrl = element.querySelector('a').getAttribute('href');
//               const imageElement = element.querySelector(`img[${imageAttr}]`);
//               const image = imageElement ? 'https:' + imageElement.getAttribute(imageAttr) : '';
//               const slug = title.replace(/[^\w\s]/g, '').replace(/\s+/g, '_').toLowerCase();

//               return { title, url: articleUrl, image, slug };
//             });
//           },
//           imageAttribute // Pass the imageAttribute as an argument to the $$eval function
//         );

//         await page.close();

//         await Promise.all(
//           articles.map(async (article, index) => {
//             const { url } = article;
//             try {
//               const page = await browser.newPage();
//               await page.goto(url, { waitUntil: 'domcontentloaded' });

//               const content = await page.$eval('div.entry-content', (element) => element.innerHTML);

//               // Check if the Model is defined before using it
//               if (Model) {
//                 let existingArticle;
//                 let slugToUse = article.slug;

//                 // Check if the slug already exists and generate a unique slug if needed
//                 let slugIndex = 1;
//                 while (true) {
//                   existingArticle = await Model.findOne({ slug: slugToUse });
//                   if (!existingArticle) {
//                     break;
//                   }
//                   slugToUse = generateUniqueSlug(article.slug, slugIndex);
//                   slugIndex++;
//                 }

//                 const transformedContent = content
//                   .replace(/vegamovies.nl/gi, 'Microflix')
//                   .replace(/\/category\/english-movies/gi, '/movies/other')
//                   .replace(/\/category\/bollywood/gi, '/movies/indian')
//                   .replace(/<noscript>/gi, '')
//                   .replace(/<\/noscript>/gi, '');

//                 if (existingArticle) {
//                   // Update the existing document instead of inserting a new one
//                   await Model.findOneAndUpdate({ url }, {
//                     title: article.title,
//                     image: article.image,
//                     slug: slugToUse,
//                     content: transformedContent,
//                   });
//                 } else {
//                   const newArticle = new Model({
//                     title: article.title,
//                     url,
//                     image: article.image,
//                     slug: slugToUse,
//                     content: transformedContent,
//                   });

//                   await newArticle.save();
//                 }
//               } else {
//                 console.error('Model is not defined.');
//               }

//               await page.close();
//             } catch (error) {
//               console.error('Error processing article:', error.message);
//             }
//           })
//         );
//       } catch (error) {
//         console.error(`Error scraping page ${pageNumber}:`, error.message);
//       }
//     }
//   }

//   try {
//     // Parallelize the scraping of Hollywood and Bollywood pages
//     await Promise.all([
//       // scrapeModel(BASE_URLS.Adult, Adult, TOTAL_PAGES.Adult),
//       scrapeModel(BASE_URLS.Bollywood, Bollywood, TOTAL_PAGES.Bollywood, 'src'),
//       scrapeModel(BASE_URLS.Hollywood, Hollywood, TOTAL_PAGES.Hollywood, 'data-lazy-src'),
//     ]);

//     // Send a response after scraping is completed
//     console.log(`Scraping and processing completed. ${scrapingStatus}`);
//   } catch (error) {
//     console.error('Error:', error.message);
//     console.log('Error occurred during scraping.');
//   } finally {
//     await browser.close();
//   }
// })();
