const mongoose = require("mongoose");
const { Contents } = require("@/models/scrapeSchema2"); // Adjust the import path as needed

const connectToMongoDB = async () => {
    await mongoose.connect(
        "mongodb://Mitranikhil33:Babul%40123%4033@ac-50g4ttb-shard-00-00.wo8qohn.mongodb.net:27017,ac-50g4ttb-shard-00-01.wo8qohn.mongodb.net:27017,ac-50g4ttb-shard-00-02.wo8qohn.mongodb.net:27017/microflix?ssl=true&replicaSet=atlas-5r5g6m-shard-0&authSource=admin&retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("Connected to MongoDB");
};

const updateDocuments = async () => {
    try {
        await connectToMongoDB();
        const documents = await Contents.find({});
        let updateCounter = 0;

        for (const doc of documents) {
            let contentRating = 0;

            // Check if imdbDetails exists and is not null
            if (doc.imdbDetails !== null || undefined && doc.imdbDetails.imdbRating !== null || undefined) {
                const imdbRatingMatch = doc.content.match(/([\d.]+)\/10/);

                if (imdbRatingMatch) {
                    contentRating = parseFloat(imdbRatingMatch[1]);
                } else {
                    console.log(`No IMDb rating data available for document with _id ${doc._id}`);
                }

                // Update the nested field only if imdbDetails is not null
                await Contents.updateOne(
                    { _id: doc._id, "imdbDetails": { $ne: null } },
                    { $set: { "imdbDetails.imdbRating.contentRating": contentRating } }
                );

                updateCounter++;
                console.log(`Document with _id ${doc._id} updated. Total updates: ${updateCounter}`);
            } else {
                console.log(`No imdbDetails field or it's null for document with _id ${doc._id}`);
            }
        }
    } catch (error) {
        console.error(error);
    } finally {
        mongoose.disconnect();
    }
};

updateDocuments();
