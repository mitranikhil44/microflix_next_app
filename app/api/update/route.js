const mongoose = require("mongoose");
const { Schema } = mongoose;
const { updateContents } = require("@/models/scrapeSchema"); // Make sure to adjust the import path

const connectToMongoDB = async () => {
    await mongoose.connect(
        "mongodb://Mitranikhil33:Babul%40123%4033@ac-50g4ttb-shard-00-00.wo8qohn.mongodb.net:27017,ac-50g4ttb-shard-00-01.wo8qohn.mongodb.net:27017,ac-50g4ttb-shard-00-02.wo8qohn.mongodb.net:27017/microflix?ssl=true&replicaSet=atlas-5r5g6m-shard-0&authSource=admin&retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("Connected to MongoDB");
};

const contentSchema = new Schema({
    title: String,
    url: String,
    image: String,
    slug: String,
    content: String,
    contentSceens: [String],
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    imdbDetails: {
        imdbRating: {
            rating: String,
            votes: String,
        },
        imdbGenres: String,
        releaseDate: String,
        formattedDate: String,
        countryOfOrigin: String,
        officialSite: String,
        language: String,
        alsoKnownAs: String,
        filmingLocations: String,
        productionCompanies: String,
    },
});

const updateContents =
    mongoose.models.update_contents ||
    mongoose.model("update_contents", contentSchema);

const updateDocuments = async () => {
    try {
        await connectToMongoDB();
        const documents = await Contents.find({});
        let updateCounter = 0;

        for (const doc of documents) {
            var rating = "";
            var votes = "";
            var formattedDate = "";
            var formattedDateObject = "";
            const imdbRating = doc.imdbDetails.imdbRating;
            const match = imdbRating.match(/([\d.]+)\/10(.*)/);
            if (match) {
                rating = match[1];
                votes = match[2];
            } else {
                console.log("No IMDb data available");
                continue; // Skip to the next iteration
            }

            // Update imdbGenres
            const updatedGenres = doc.imdbDetails.imdbGenres
                .map((genre) => genre.trim())
                .join(", ");

            // Process details field
            const releaseDateRegex = /^Release date(.+)$/i;
            const detailsMatches = doc.imdbDetails.details
                .map((detail) => releaseDateRegex.exec(detail))
                .filter((match) => match !== null);

            if (detailsMatches.length > 0) {
                formattedDate = detailsMatches[0][1].trim();
                const dateObject = new Date(formattedDate);
                formattedDateObject = `${dateObject.getMonth() + 1
                    }-${dateObject.getDate()}-${dateObject.getFullYear()}`;
            } else {
                console.log("No Release date information available", doc._id);
                formattedDate = null;
                formattedDateObject = null;
            }

            // Process other details
            const details = doc.imdbDetails.details;
            let countryOfOrigin = null;
            let officialSite = null;
            let language = null;
            let alsoKnownAs = null;
            let filmingLocations = null;
            let productionCompanies = null;

            for (let i = 2; i < details.length - 1; i++) {
                const currentDetail = details[i];
                const nextDetail = details[i + 1];

                if (
                    currentDetail.startsWith("Country of origin") &&
                    !nextDetail.startsWith("Country of origin")
                ) {
                    countryOfOrigin = nextDetail.trim();
                } else if (
                    currentDetail.startsWith("Official site") &&
                    !nextDetail.startsWith("Official site")
                ) {
                    officialSite = nextDetail.trim();
                } else if (
                    currentDetail.startsWith("Language") &&
                    !nextDetail.startsWith("Language")
                ) {
                    language = nextDetail.trim();
                } else if (
                    currentDetail.startsWith("Also known as") &&
                    !nextDetail.startsWith("Also known as")
                ) {
                    alsoKnownAs = nextDetail.trim();
                } else if (
                    currentDetail.startsWith("Filming locations") &&
                    !nextDetail.startsWith("Filming locations")
                ) {
                    filmingLocations = nextDetail.trim();
                } else if (
                    currentDetail.startsWith("Production companies") &&
                    !nextDetail.startsWith("Production companies")
                ) {
                    productionCompanies = nextDetail.trim();
                }
            }

            const updatedDoc = new updateContents({
                title: doc.title,
                url: doc.url,
                image: doc.image,
                slug: doc.slug,
                content: doc.content,
                contentSceens: doc.contentSceens,
                imdbDetails: {
                    imdbRating: {
                        rating: rating,
                        votes: votes,
                    },
                    imdbGenres: updatedGenres,
                    formattedDate: formattedDateObject,
                    releaseDate: formattedDate,
                    countryOfOrigin: countryOfOrigin,
                    officialSite: officialSite,
                    language: language,
                    alsoKnownAs: alsoKnownAs,
                    filmingLocations: filmingLocations,
                    productionCompanies: productionCompanies,
                },
            });

            await updatedDoc.save();

            updateCounter++;
            console.log(
                `Document with _id ${doc._id} updated. Total updates: ${updateCounter}`
            );
        }
    } catch (error) {
        console.error(error);
    } finally {
        mongoose.disconnect();
    }
};

updateDocuments();
