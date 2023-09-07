import mongoose from 'mongoose';
import { connectToDatabase } from './db';
import { Scrape } from './schema/scrapeSchema';

export default async function handler(req, res) {
  try {
    await connectToDatabase(); // Establish the database connection

    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 24;
    const category = req.query.category || 'hollywood';

    let filteredData;

    // Fetch all files
    const allFiles = await Scrape.find();

    if (category === 'hollywood') {
      // Filter by All Movies
      filteredData = allFiles.slice(skip, skip + limit);
    } else if (category === 'hollywood/movies') {
      // Filter by Movies
      filteredData = allFiles.filter(file => !file.title.toLowerCase().includes('season'));
      filteredData = filteredData.slice(skip, skip + limit);
    } else if (category === 'hollywood/seasons') {
      // Filter by Seasons
      filteredData = allFiles.filter(file => file.title.toLowerCase().includes('season'));
      filteredData = filteredData.slice(skip, skip + limit);
    } else if (category === 'hollywood/adult') {
      // Filter by adult
      filteredData = allFiles.filter(file => file.title.toLowerCase().includes('18+'));
      filteredData = filteredData.slice(skip, skip + limit);
    } else {
      // Unknown category
      res.status(400).json({ error: 'Invalid category' });
      return;
    }

    const response = {
      data: filteredData,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error while fetching data' });
  } finally {
    mongoose.connection.close();
  }
}
