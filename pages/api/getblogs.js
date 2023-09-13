// pages/api/fetchScrapeData.js
import mongoose from 'mongoose';
import { connectToDatabase } from './database/db';
import { Scrape } from './database/scrapeSchema';

export default async function handler(req, res) {
    try {
        await connectToDatabase(); // Establish the database connection

        const { slug } = req.query;

        // Query the "scrape" collection for data with the matching slug
        const jsonData = await Scrape.findOne({ slug });

        if (jsonData) {
            res.status(200).json(jsonData);
        } else {
            res.status(404).json({ error: 'No Blogs Found' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error fetching data' });
    } finally {
        mongoose.connection.close(); // Close the database connection
    }
}
