const mongoose = require("mongoose");
const cheerio = require("cheerio");
const db = require("../models");

module.exports = function (app) {
    app.get("/articles", function(req, res) {
        request("https://www.apnews.com/", function(error, response, html) {
            const $ = cheerio.load(html);

            let results = []

            console.log(results)
        })
    })
}