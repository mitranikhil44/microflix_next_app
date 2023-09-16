import mongoose from 'mongoose';
import connectToDatabase from './database/db';
import { Hollywood, Bollywood } from './database/scrapeSchema';

export default async function handler(req, res) {
  await connectToDatabase(); // Establish the database connection

  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit);
  const category = req.query.category;

  try {
    const validCategories = [
      "hollywood",
      'hollywood/movies',
      'hollywood/seasons',
      'hollywood/adult',
      "bollywood",
      'bollywood/movies',
      'bollywood/seasons',
      'bollywood/adult',
    ];

    if (!validCategories.includes(category)) {
      res.status(400).json({ error: 'Invalid category' });
      return;
    }

    const [apiCategory, contentCategory] = category.split('/');

    let filterConditions = {};

    if (contentCategory === 'movies' || contentCategory === 'seasons') {
      filterConditions.title = contentCategory === 'movies' ? { $not: /season/i } : /season/i;
    } else if (contentCategory === 'adult') {
      filterConditions.title = /18\+/i;
    } 

    const Model = apiCategory === 'hollywood' ? Hollywood : Bollywood;

    const query = Model.find(filterConditions).skip(skip).limit(limit);

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
