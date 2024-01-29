import mongoose from 'mongoose';

const { Schema } = mongoose; 

const contentSchema = new Schema({
    title: String,
    url: String,
    image: String,
    slug: String,
    content: String,
    contentSceens: [String],
    imdbDetails: {
        imdbRating: {
            rating: String,
            votes: String,
            contentRating: String,
        },
        imdbGenres: String,
        formattedDateObject: String,
        formattedDate: String,
        countryOfOrigin: String,
        officialSite: String,
        language: String,
        alsoKnownAs: String,
        filmingLocations: String,
        productionCompanies: String,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

export const Contents =
    mongoose.models.contents ||
    mongoose.model("contents", contentSchema);
