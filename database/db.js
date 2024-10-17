const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // load environment variables

// connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected'); // log success
    } catch (error) {
        console.error('Connection failed:', error.message); // log error
        process.exit(1); // exit on failure
    }
};

module.exports = connectDB;






