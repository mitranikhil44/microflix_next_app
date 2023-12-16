import mongoose from 'mongoose';

const scrapeSchema = new mongoose.Schema({
  title: String,
  imdb: [String], // Change this to an array of strings
  url: String,
  image: String,
  slug: String,
  content: String,
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Contents = mongoose.models.Contents || mongoose.model('Contents', scrapeSchema);
