import connectToDatabase from '@/lib/mongodb';
import { updateContents } from '@/models/scrapeSchema';

export async function GET(req) {
    try {
        await connectToDatabase(); // Establish the database connection

        const slug = req.nextUrl.searchParams.get("slug");
        const hollywoodData = await updateContents.findOne({ slug });

        if (hollywoodData) {
            return Response.json({content: hollywoodData}, {status: 200});
        } else {
            return Response.json({ error: 'No Blogs Found' }, {status: 404});
        }
    } catch (error) {
        console.error('Error:', error);
        return Response.json({ error: 'Error fetching data' }, {status: 500});
    }
}
