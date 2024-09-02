const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://d3monw1ngs:poohBear87@atlascluster.vqgur.mongodb.net/');
        console.log('Database connection successful');
    } catch (error) {
        console.error('Database conenction error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;