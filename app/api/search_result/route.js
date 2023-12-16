import connectToDatabase from "@/lib/mongodb";
import { Contents } from "@/models/scrapeSchema";
export async function GET(req) {
  try {
    await connectToDatabase();

    const query = req.nextUrl.searchParams.get("query") || "";
    const pageNo = req.nextUrl.searchParams.get("page") || 1;
    const pageSize = req.nextUrl.searchParams.get("pageSize") || 12;

    const skip = (pageNo - 1) * pageSize;

    // Get total count without applying skip and limit
    const totalCount = await Contents.countDocuments({
      title: { $regex: new RegExp(query, "i") },
    });

    // Fetch suggestions with skip and limit
    const suggestions = await Contents.find({
      title: { $regex: new RegExp(query, "i") },
    }).skip(skip)
      .limit(pageSize);

    const response = suggestions.map((suggestion) => suggestion);

    return Response.json(
      { result: { totalData: totalCount, data: response } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return Response.json(
      { error: "Error while fetching suggestions" },
      { status: 500 }
    );
  }
}
