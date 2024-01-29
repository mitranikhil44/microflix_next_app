const mongoose = require("mongoose");
const { Contents } = require("@/models/scrapeSchema2"); // Adjust the import path as needed

const connectToMongoDB = async () => {
    await mongoose.connect(
        "mongodb://Mitranikhil33:Babul%40123%4033@ac-50g4ttb-shard-00-00.wo8qohn.mongodb.net:27017,ac-50g4ttb-shard-00-01.wo8qohn.mongodb.net:27017,ac-50g4ttb-shard-00-02.wo8qohn.mongodb.net:27017/microflix?ssl=true&replicaSet=atlas-5r5g6m-shard-0&authSource=admin&retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("Connected to MongoDB");
};

const updateDocuments = async () => {
    try {
        await connectToMongoDB();
        // Find the document by its _id and update the formattedDateObject field
    const updatedContent = await Contents.findByIdAndUpdate(
        contentId,
        { $set: { 'imdbDetails.formattedDateObject': newFormattedDateObject } },
        { new: true } // Return the updated document
      );
  
      // Log the updated document
      console.log('Updated content:', updatedContent);
  
      // Disconnect from the database
      await mongoose.disconnect();
    } catch (error) {
      console.error('Error updating content:', error);}
      finally {
        mongoose.disconnect();
    }
};

updateDocuments();
