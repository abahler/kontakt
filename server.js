"use strict";

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

// Require models
let Card = require('./models/card');
let Message = require('./models/message');
let User = require('./models/user');

app.use(bodyParser.json());
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

app.get('/card', (req, res) => {
    console.log('A GET request to /card was received!');
    Card.find({}, (err, card) => {
        if (err) {
            res.status(500).json({'error': err});
        }
        console.log('card object: ', card);
        res.status(201).json(card);
    });
});

// Don't need bodyParser as second arg because we set it using app.use()
app.post('/card', (req, res) => {
    console.log('A POST request to /card was received!');
    console.log('req dot body: ', req.body);
    let obj = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        occupation: req.body.occupation,
        professionalSummary: req.body.professionalSummary,
        company: req.body.company,
        officePhone: req.body.officePhone,
        cellPhone: req.body.cellPhone,
        addlNote: req.body.addlNote
    };
    
    Card.create(obj, (err, card) => {
        if (err || !card) {
            return res.status(500).json({'error': err});
        }
        
        return res.status(201).json(card);
    });
});

// Set up MongoDB connection. The moment you connect to localhost/kontakt, it will create it if not exists.
let runServer = (callback) => {
    console.log('db url: ', config.DATABASE_URL);
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

exports.app = app;
exports.runServer = runServer;