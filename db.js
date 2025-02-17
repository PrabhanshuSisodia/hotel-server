const mongoose = require('mongoose')

// Define MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotels'  //Replace 'mydatabase' with your database name like 'hotels'

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