import { sql } from '@vercel/postgres';
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

// Function to read and parse JSON file
function readJSONFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    throw new Error('Error reading JSON file: ' + error.message);
  }
}

// Function to create the table if it doesn't exist
async function createTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS movies (
        id SERIAL PRIMARY KEY,
        title TEXT,
        url TEXT,
        image TEXT,
        slug TEXT,
        content TEXT,
        imdb_rating TEXT,
        imdb_name TEXT,
        imdb_genres TEXT,
        release_date TEXT,
        country TEXT,
        language TEXT,
        filming_locations TEXT,
        production_companies TEXT
      );
    `;
  } catch (error) {
    throw new Error('Error creating table: ' + error.message);
  }
}

// Function to insert data into PostgreSQL
async function insertData(jsonData) {
  try {
    await createTable();

    for (const item of jsonData) {
      const imdbDetails = item.imdbDetails || {};
      const imdbPosterLink = imdbDetails.imdbPosterLink && imdbDetails.imdbPosterLink[0] ? imdbDetails.imdbPosterLink[0].url : null;
      const releaseDate = imdbDetails.imdbMoreDetails?.find(detail => detail.detailKey === "Release date")?.detailValue || null;
      const country = imdbDetails.imdbMoreDetails?.find(detail => detail.detailKey === "Country of origin")?.detailValue || null;
      const language = imdbDetails.imdbMoreDetails?.find(detail => detail.detailKey === "Language")?.detailValue || null;
      const filmingLocations = imdbDetails.imdbMoreDetails?.find(detail => detail.detailKey === "Filming locations")?.detailValue || null;
      const productionCompanies = imdbDetails.imdbMoreDetails?.find(detail => detail.detailKey === "Production companies")?.detailValue || null;

      await sql`
        INSERT INTO movies (
          title, url, image, slug, content,
          imdb_rating, imdb_name, imdb_genres,
          release_date, country, language,
          filming_locations, production_companies
        ) VALUES (
          ${item.title || null}, ${item.url || null}, ${item.image || null}, ${item.slug || null}, ${item.content || null},
          ${imdbDetails.imdbRating?.rating || null}, ${imdbDetails.imdbName || null}, ${imdbDetails.imdbGenres || null},
          ${releaseDate}, ${country}, ${language},
          ${filmingLocations}, ${productionCompanies}
        );
      `;
    }

    console.log('Data inserted successfully');
  } catch (error) {
    console.error('Error inserting data:', error);
    throw new Error('Error inserting data: ' + error.message);
  }
}

export async function POST(req) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'microflix.contents.json');
    const jsonData = readJSONFile(filePath);
    await insertData(jsonData);
    return NextResponse.json({ message: 'Data inserted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
