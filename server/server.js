const ExcelJS = require("exceljs");
const path = require("path");
const mongoose = require("mongoose");

const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const port = process.env.port || 3001;

// Middleware for the code 
app.use(cors());
app.use(bodyParser.json());

// Load the api into the main server.js
const apiRoutes = require("./api");
const Data = require("./Data");

// Mount the API routes into the main server.js 
// This is done so that whenever the path is "/api/data", the api is called to get all the data from the database 
app.use("/api", apiRoutes);

// Path of the excel file to be loaded into the server and then into the database 
const excelFilePath = path.join(__dirname, 'Parsed_FE_Interviews_Cleaned.xlsx');

// Making a connection to the local MongoDB database 
mongoose.connect('mongodb://localhost/dataprocessing_shl', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Function to extract the data from the excel file and load it into the MongoDB database that we have created 
async function extractFromExcelAndSaveToMongoDB() {
    // Create a new workbook 
    const workbook = new ExcelJS.Workbook();

    // Using try catch exception handling to make sure the code doesnot break 
    try {

        // Load the excel file into the server 
        await workbook.xlsx.readFile(excelFilePath);

        // Because all the data is in the first sheet itself 
        const worksheet = workbook.getWorksheet(1);

        // Traverse through each row of the worksheet 
        worksheet.eachRow( async (row) => {
            // Extract each column of the row 
            const rowData = {
                Title: row.getCell(1).value,
                Technologies: row.getCell(2).value,
                Frontend: row.getCell(3).value,
                Backend: row.getCell(4).value,
                Database: row.getCell(5).value,
                Infrastructure: row.getCell(6).value,
            };

            // Implementing a mechanism where it is checked where the data is already present in the DB
            // If present in the DB, it will not load into the DB again but use the already existing data in the DB

            const existingData = await Data.findOne(rowData);

            if(!existingData) {
                // If there is no existing data in the database 
                // Save the data into the database 

                const newData = new Data(rowData);

                // Save this data into the database 
                try {
                    await newData.save();
                    console.log("Data saved into the database: ", newData);
                } catch (error) {
                    console.error("Error in saving the data to the database: ", error.message);
                }
            } else {
                console.log("Data already exists in the database: ", existingData);
            }
        } )

    } catch (error) {
        console.error("Error extracting data from excel and loading it into the MongoDB database");
    }
}

// Calling the above function so that the data is loaded when the server is run
extractFromExcelAndSaveToMongoDB();

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});