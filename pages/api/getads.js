import mongoose from 'mongoose';
import connectToDatabase from './database/db';

export default async function handler(req, res) {
  try {
    await connectToDatabase(); // Establish the database connection

    // Define the name of the collection
    const collectionName = 'adestra_ads';

    // Use Mongoose to fetch all data from the collection
    const ads = await mongoose.connection.db.collection(collectionName).find().toArray();

    if (!ads || ads.length === 0) {
      res.status(404).json({ error: 'No Ads Found' });
      return;
    }

    res.status(200).json(ads);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
