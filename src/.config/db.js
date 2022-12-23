const mongoose = require('mongoose');

const connectDB = async () => {
    return mongoose.connect('mongodb+srv://Akash:852654@cluster0.9xzz5v6.mongodb.net/Hackathon?retryWrites=true&w=majority')
}

module.exports = connectDB;