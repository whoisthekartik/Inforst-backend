
const mongoose = require('mongoose');
require('dotenv').config();
const MONGO_URI = "mongodb+srv://kartiksharma95407:Kartik%40123@cluster0.y9toa33.mongodb.net/inforst?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
