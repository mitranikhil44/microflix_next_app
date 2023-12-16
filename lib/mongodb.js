import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://Mitranikhil33:Babul%40123%4033@ac-50g4ttb-shard-00-00.wo8qohn.mongodb.net:27017,ac-50g4ttb-shard-00-01.wo8qohn.mongodb.net:27017,ac-50g4ttb-shard-00-02.wo8qohn.mongodb.net:27017/microflix?ssl=true&replicaSet=atlas-5r5g6m-shard-0&authSource=admin&retryWrites=true&w=majority';

async function connectToDatabase() {
    try {
        await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
}

export default connectToDatabase ;
