import mongoose from 'mongoose';
import connectToDatabase from '@/lib/mongodb';
import { Contents } from '@/models/scrapeSchema';

export async function GET(req) {
    await connectToDatabase();
        const query = await Contents.find({}, { slug: 1 }).exec();

        const response = {
            query,
            totalQueries: query.length,
        };
    return response
    }
