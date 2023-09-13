// scrapeSchema.js
import mongoose from 'mongoose';

const scrapeSchema = new mongoose.Schema({
    title: String,
    slug: String,
    url: String,
    image: String,
    content: String,
});

const Scrape = mongoose.models.Scrape || mongoose.model('Scrape', scrapeSchema);

export { Scrape };
