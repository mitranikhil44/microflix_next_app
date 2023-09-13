import mongoose from 'mongoose';

const hollywoodSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
    },
    slug: {
        type: String,
        unique: true,
    },
    content: {
        type: String,
    },
});

const bollywoodSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
    },
    slug: {
        type: String,
        unique: true,
    },
    content: {
        type: String,
    },
});

export const Hollywood =  mongoose.models.Hollywood || mongoose.model('Hollywood', hollywoodSchema);
export const Bollywood =  mongoose.models.Bollywood || mongoose.model('Bollywood', bollywoodSchema);
