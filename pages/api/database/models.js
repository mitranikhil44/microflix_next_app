import mongoose from 'mongoose';

const hollywoodSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
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
});

const bollywoodSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
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
});

const adultSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
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
});

export const Hollywood =  mongoose.models.Hollywood || mongoose.model('Hollywood', hollywoodSchema);
export const Bollywood =  mongoose.models.Bollywood || mongoose.model('Bollywood', bollywoodSchema);
export const Adult =  mongoose.models.Adult || mongoose.model('Adult', adultSchema);
