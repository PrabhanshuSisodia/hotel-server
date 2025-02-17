const mongoose = require('mongoose')
require("dotenv").config();

// Define MongoDB connection URL
// const mongoURL = 'process.env.MONGODB_URL_LOCAL'  //Replace 'mydatabase' with your database name like 'hotels'

const mongoURL = process.env.MONGODB_URL;

mongoose.connect(mongoURL, {
    // useNewURLParser: true,
    // useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('connected', () => {
    console.log("Connected to MongoDB server...");
})

db.on('error', (err) => {
    console.log("MongoDB connection error: ", err)
})

db.on('disconnected', () => {
    console.log('MongoDB disconnected')
})

//Export the database connection
module.exports = db;