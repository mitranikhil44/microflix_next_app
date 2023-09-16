import connectToDatabase from './database/db';
import { Hollywood, Bollywood } from './database/scrapeSchema';

export default async function handler(req, res) {
  try {
    await connectToDatabase();

    const query = req.query.query || '';
    const suggestions = await (Hollywood || Bollywood).find({
      title: { $regex: new RegExp(query, 'i') },
    });

    const response = {
      suggestions: suggestions.map((suggestion) => suggestion),
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error while fetching suggestions' });
  }
}
