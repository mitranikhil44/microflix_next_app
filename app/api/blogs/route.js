import mongoose from 'mongoose';
import connectToDatabase from '@/lib/mongodb';
import { Contents } from '@/models/scrapeSchema';

export async function GET(req) {

  await connectToDatabase();
  const searchParams = req.nextUrl.searchParams;

  const page = parseInt(searchParams.get('page')) || 1;
  const pageSize = parseInt(searchParams.get('page_size')) || 12;
  const category = searchParams.get('category') || 'contents';
  try {
    const validCategories = [
      'contents',
      'content_movies',
      'content_seasons',
      'content_adult',
      'top_contents',
      'top_content_movies',
      'top_content_seasons',
      'top_content_adult',
      'latest_contents',
    ];

    if (!validCategories.includes(category)) {
      return Response.json({ error: 'Invalid category' }, { status: 400 });
    }
    let response = [];
    const totalPageLength = await Contents.countDocuments({});

    if (category === 'latest_contents') {
      const sortedData = await Contents.find()
        .sort({ "imdbDetails.formattedDateObject": -1 }) // Use an object for sorting
        .skip((page - 1) * pageSize)
        .limit(pageSize);

      response.push({
        data: sortedData,
        currentPage: page,
        pageSize,
        totalPages: totalPageLength,
      });
    }

    if (
      category === 'content_movies' ||
      category === 'content_seasons' ||
      category === 'content_adult' ||
      category === 'contents'
    ) {
      // Fetch data based on category
      let filterConditions = {};

      if (category === 'content_movies') {
        filterConditions.title = { $not: /season/i };
      } else if (category === 'content_seasons') {
        filterConditions.title = { $regex: /season/i };
      } else if (category === 'content_adult') {
        filterConditions.title = { $regex: /18\+/i };
      } else if (category === 'contents') {
        // No specific filter for 'content' category
      }

      const query = Contents.find({ ...filterConditions }).sort({ updatedAt: 1 })

      // Apply pagination
      query.skip((page - 1) * pageSize).limit(pageSize);

      const data = await query.exec();

      response.push({
        data,
        currentPage: page,
        pageSize,
        totalPages: totalPageLength,
      });
    }

    // Handle "top_content" categories separately
    if (
      category === 'top_content_movies' ||
      category === 'top_content_seasons' ||
      category === 'top_content_adult' ||
      category === 'top_contents'
    ) {
      // Fetch data for "top_content" categories here
      let topFilterConditions = {};

      if (category === 'top_content_movies') {
        topFilterConditions.title = { $not: /season/i };
      } else if (category === 'top_content_seasons') {
        topFilterConditions.title = { $regex: /season/i };
      } else if (category === 'top_content_adult') {
        topFilterConditions.title = { $regex: /18\+/i };
      } else if (category === 'top_contents') {
        // No specific filter for 'top_content' category
      }

      // Define an aggregation pipeline to filter and sort the data
      const aggregationPipeline = [
        {
          $sort: { "imdbDetails.imdbRating.rating": -1 },
        },
        {
          $skip: (page - 1) * pageSize, // Apply pagination
        },
        {
          $limit: pageSize,
        },
      ];


      // Use the aggregation pipeline to get the desired data
      const topData = await Contents.aggregate(aggregationPipeline).exec();

      response.push({
        data: topData,
        currentPage: page,
        pageSize,
        totalPages: totalPageLength,
      });
    }



    // Only respond with data if one of the valid categories matched
    if (response.length > 0) {
      return Response.json(response, { status: 200 });
    } else {
      return Response.json({ error: 'Invalid category' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: 'Error while fetching data' }, { status: 500 });
  } finally {
    mongoose.connection.close();
  }
}
