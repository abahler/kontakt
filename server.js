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
            if (callback) {     // Signal that everything is up and running
                callback();
            }
        });
    });
};

if (require.main === module) {  // If this script is run directly (not required somewhere else)
    runServer(function(err) {
        if (err) {
            console.error(err);
        }
    });
}

let Card = require('./models/card');
let Message = require('./models/message');
let User = require('./models/user');

// Routes
app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

exports.app = app;
exports.runServer = runServer;