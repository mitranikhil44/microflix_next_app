import mongoose from 'mongoose';

const { Schema } = mongoose; 

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
            contentRating: String,
            rating: String,
            votes: String,
        },
        imdbGenres: String,
        releaseDate: String,
        formattedDate: String,
        formattedDateObject: String,
        countryOfOrigin: String,
        officialSite: String,
        language: String,
        alsoKnownAs: String,
        filmingLocations: String,
        productionCompanies: String,
    },
});

export const Contents =
    mongoose.models.contents ||
    mongoose.model("contents", contentSchema);