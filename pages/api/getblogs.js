import connectToDatabase from './database/db';
import { Hollywood, Bollywood } from './database/scrapeSchema';

export default async function handler(req, res) {
    try {
        await connectToDatabase(); // Establish the database connection

        const { slug } = req.query;

        // Query both the "Hollywood" and "Bollywood" collections for data with the matching slug
        const hollywoodData = await Hollywood.findOne({ slug });
        const bollywoodData = await Bollywood.findOne({ slug });

        if (hollywoodData || bollywoodData) {
            const jsonData = hollywoodData || bollywoodData;
            res.status(200).json(jsonData);
        } else {
            res.status(404).json({ error: 'No Blogs Found' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
}
