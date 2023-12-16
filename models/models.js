import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    imdb: {
        type: [String], 
    },
    url: {
        type: String,
    },
    image: {
        type: String,
    },
    slug: {
        type: String,
    },
    content: {
        type: String,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

export const Contents = mongoose.models.Contents || mongoose.model('Contents', contentSchema);
