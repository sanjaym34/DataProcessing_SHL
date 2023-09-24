// Schema for the data being stored in the database

const { Schema, model } = require("mongoose");

const Data = new Schema({
    Title: String,
    Technologies: String,
    Frontend: String,
    Backend: String,
    Database: String,
    Infrastructure: String
})

module.exports = model("Data", Data);