import mongoose from 'mongoose';

const scrapeSchema = new mongoose.Schema({
    title: String,
    slug: String,
    url: String,
    image: String,
    content: String,
});

export const Hollywood = mongoose.models.Hollywood || mongoose.model("Hollywood", scrapeSchema);
export const Bollywood = mongoose.models.Bollywood || mongoose.model("Bollywood", scrapeSchema);
export const Adult = mongoose.models.Adult || mongoose.model("Adult", scrapeSchema);
