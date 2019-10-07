const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
// Scraping tools
const axios = require("axios");
const cheerio = require("cheerio")
// Require all models
const db = require("./models")
const PORT = process.env.PORT || 3000;
// Initialize Express
const app = express();

// Middleware

// Use morgan for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
// Designate static folder
app.use(express.static("public"));

// routes
require("./routes/html-routes");
require("./routes/api-routes");

// Configure mongoose & database
mongoose.Promise = Promise;
const dbURI = process.env.MONGODB_URI || "mongodb://localhost/greatescrapedb"
mongoose.set("useCreateIndex", true)
mongoose.connect(dbURI, { useNewUrlParser: true });

app.listen(PORT, () => {
    console.log("Now live on port: " + PORT + "\n٩(^‿^)۶")
})