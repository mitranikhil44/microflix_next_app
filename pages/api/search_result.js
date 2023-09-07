import { connectToDatabase } from './db';
import { Scrape } from './schema/scrapeSchema';

export default async function handler(req, res) {
  try {
    await connectToDatabase(); 

    const query = req.query.query || '';
    const suggestions = await Scrape.find({
      title: { $regex: new RegExp(query, 'i') },
    })
      .limit(10);

    const response = {
      suggestions: suggestions.map((suggestion) => suggestion),
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error while fetching suggestions' });
  }
}