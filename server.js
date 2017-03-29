"use strict";

/*
 * DEPENDENCIES AND CONFIG
 */

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

/*
 * ROUTES 
 */
 
app.get('/', (req, res) => {
    // This line does nothing because it is overwritten by the .html file's markup
    res.status(200).send('Hello World!');
});

// GET /admin: A sandbox for digging into internals and debugging
app.get('/admin', (req, res) => {
    res.status(201).json({"process-dot-env": process.env});
    
    global.alexDidThis = 'alex says hello';
    
    console.log('global: ', global);
});

// GET /card: Get all cards
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

// POST /card: Create a business card
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

// GET /users: Get all users
app.get('/users', (req, res) => {
    console.log('A GET request to /user was received!');
    User.find({}, (err, users) => {
        if (err || !users) {
            res.status(500).json({'error': err});
        }
        console.log('user list: ', users);
        res.status(201).json(users);
    });
});

// POST /user: Create a new user
app.post('/user', (req, res) => {
    console.log('A POST request to /user was received!');
    console.log('req dot body: ', req.body);
    let obj = {
            id: 1001,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName, 
            password: req.body.password,
            avatar: req.body.avatar    
        };
    
    User.create(obj, (err, user) => {
        if (err || !user) {
            return res.status(500).json({'error': err});
        }
        
        return res.status(201).json(user);
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

/*
 * EXPORTS
 */

exports.app = app;
exports.runServer = runServer;