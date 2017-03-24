"use strict";

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

app.use(bodyParser.json());
app.use(express.static('public'));

// Set up MongoDB connection
let runServer = (callback) => {
    mongoose.connect(config.DATABASE_URL, (err) => {
        if (err && callback) {
            return callback(err);
        }

        app.listen(config.PORT, () => {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};

if (require.main === module) {
    runServer(function(err) {
        if (err) {
            console.error(err);
        }
    });
}

// Routes
app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log('Server now running on port ', port);
});

exports.app = app;
exports.runServer = runServer;