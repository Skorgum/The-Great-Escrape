const mongoose = require("mongoose");
const cheerio = require("cheerio");
const db = require("../models");

module.exports = function (app) {

    // Scrape Route
    app.get("/scrape", function (req, res) {
        axios.get("https://www.https://www.apnews.com/apf-topnews")
            .then(function (response) {
                const $ = cheerio.load(response.data)

                $("div.FeedCard").each(function (i, element) {

                    let headline = $(element).find("a").find("h1").text();
                    let link = "https://apnews.com" + $(element).find("a").attr("href");
                    let summary = $(element).find("a").find("div.content").find("p").text();

                    let results = {
                        headline: headline,
                        link: link,
                        summary: summary
                    };

                    db.Article.create(results)
                    .then(function(dbArticle) {
                        console.log(dbArticle)
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
                });

                res.send("Srape Completed Successfully")
            });

    });

    // Route for getting all Articles in db
    app.get("/articles", function (req, res) {
        db.Article.find({})
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
    });

    // Route for grabbing specific Article by id & populate with its associated Note
    app.get("/articles/:id", function(req,res) {
        db.Article.findOne({ _id: req.params.id })
        .populate("note")
        .then(function(dbArticle) {
            res.json(dbArticle)
        })
        .catch(function(err) {
            res.json(err);
        });
    });

    // Route for saving/updating an Article's associated Note
    app.post("/articles/:id", function(req, res) {
        db.Note.create(req.body)
        .then(function(dbNote) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, {new: true });
        })
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
    });
};