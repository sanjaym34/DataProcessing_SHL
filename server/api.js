// This API will call the database i.e. MongoDB and return all the rows 
const express = require('express');
const router = express.Router();

// Import the schema from the Data.js file 
const Data = require("./Data");

// Create a route to get all the data i.e. whenever this route is called, it should return all the rows 
router.get('/data', async (req, res) => {
    // Using try catch exception handling to make sure that the code doesnot break anywhere 
    try {
        const data = await Data.find(); // Retrieve all the data from the mongoDB database
        res.json(data); //Send the data as a JSON response
    } catch(error) {
        console.log("Error fetching data: ", error.message);
        res.status(500).json({error: "Internal server error in fetching data from the database"});
    }
});

module.exports = router;