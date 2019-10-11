const mongoose = require("mongoose");
const cheerio = require("cheerio");
const db = require("../models");

module.exports = function (app) {
    app.get("/scrape", function (req, res) {
        axios.get("https://www.https://www.apnews.com/")
            .then(function (response) {
                const $ = cheerio.load(response.data)

                let results = {};
                
                let headline = $(element).find("a").find("h1").text();
                let link = "https://apnews.com" + $(element).find("a").attr("href");
                let image = $(element).find

            })

        console.log(results)
    })
}
