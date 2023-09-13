import mongoose from 'mongoose';
import { connectToDatabase } from './database/db';
import { Scrape } from './database/scrapeSchema';

export default async function handler(req, res) {
  try {
    await connectToDatabase(); // Establish the database connection

    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const category = req.query.category;

    let filterConditions = {};

    if (category === 'hollywood/movies') {
      // Filter by Movies
      filterConditions.title = { $not: /season/i };
    } else if (category === 'hollywood/seasons') {
      // Filter by Seasons
      filterConditions.title = /season/i;
    } else if (category === 'hollywood/adult') {
      // Filter by adult
      filterConditions.title = /18\+/i;
    } else if (category !== 'hollywood') {
      // Unknown category
      res.status(400).json({ error: 'Invalid category' });
      return;
    }

    // Query the database with pagination and filter conditions
    const query = Scrape.find(filterConditions)
      .skip(skip)
      .limit(limit);

    // Execute the query
    const filteredData = await query.exec();

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
