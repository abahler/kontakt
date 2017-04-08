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
let User = require('./models/user');

app.use(bodyParser.json());
app.use(express.static('public'));

/*
 * ROUTES 
 */
 
// GET /: Main screen
app.get('/', (req, res) => {
    // This line does nothing because it is overwritten by the .html file's markup
    res.status(200).send('Hello World!');
});

// GET /foobar: Return some dummy JSON
app.get('/foobar', (req, res) => {
    res.status(201).json({"message": "success!"});
});

// GET /admin: A sandbox for digging into internals and debugging
app.get('/admin', (req, res) => {
    // TODO: enhance after MVP stage to check for proper permissions in current user object
    res.status(201).json({"process-dot-env": process.env});
    
    global.adminDidThis = 'The admin says hello';
    
    console.log('global: ', global);
});

// GET /kontakts/:username: Get all Kontakts (business cards) for the specified user
app.get('/kontakts/:username', (req, res) => {
    let userName = req.params.username;
    console.log('This is the username: ', userName);
    
    // let outerCards;
    User.findOne({"userName": userName}, (err, user) => {         
        if (err || !user) {
            console.log('the err: ', err);
            return res.status(500).json({'error': err});
        }
        
        console.log('user object: ', user);
        res.status(201).json({"kontakts": user.kontakts});
        // Assigning `user.kontakts` to `outerCards` and sending the response on line 60 works
    });
    
    // res.status(201).json(outerCards);
});


// GET /card/:userName: Retrieve current user's card.
// > NOTE: this will be used to show card both for reference ('My Card') and before sending to a new kontakt ('Send Card')
// > Client will take care of displaying add'l features for the latter, like 'Edit' icons
app.get('/card/:userName', (req, res) => {
    let userName = req.params.userName;
    
    Card.findOne({"userName": userName}, (err, card) => {
        if (err || !card) {
            res.status(500).json({"error": err});
        }
        
        res.status(201).json(card);
    });
});

// POST /card/send: Send the current user's card to the selected user
app.post('/card/send', (req, res) => {
    let postData = {
        fromUser: req.body.from,
        toUser: req.body.to
    };
    
    console.log('A POST request to /card/send was received!');
    console.log('postData: ', postData);
    
    res.status(201).json({"message": "Your card has been sent!"});    
    // TODO: actually push onto user's kontakts list, with 'accepted' flag set to false
    // > Query for the 'from' user's card.
    // > Take that card and push it onto the 'to' user's kontakts array
});

// GET /users/:searchTerm : Get all users where first or last name contains `searchTerm`
app.get('/users/:searchTerm', (req, res) => {
    let searchTerm = req.params.searchTerm;
    let regex = new RegExp(searchTerm, 'i');
    
    console.log('searchTerm: ', searchTerm);
    console.log('regex: ', regex);

    // TODO: match regex on firstName or lastName
    /*
    let query = {
        "firstName": {$regex: regex}
    };
    */
    let query = {
        $match: {
            $or: [
                {"firstName": {$regex: regex}}, 
                {"lastName": {$regex: regex}}
            ]
        }
    };
    // Replace find() with aggregate() if you want to do an OR condition
    User.aggregate(query, (err, users) => {
        if (err || !users) {
            res.status(500).json({'error': err});
        }
        
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
            avatar: req.body.avatar,
            kontakts: req.body.kontakts
        };
    
    User.create(obj, (err, user) => {
        if (err || !user) {
            return res.status(500).json({'error': err});
        }
        
        return res.status(201).json(user);
    });
});

// POST /card: Create a business card
// Don't need bodyParser as second arg because we set it using app.use()
app.post('/card', (req, res) => {
    console.log('A POST request to /card was received!');
    console.log('req dot body: ', req.body);
    let newCard = {
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
    
    Card.create(newCard, (err, card) => {
        if (err || !card) {
            return res.status(500).json({'error': err});
        }
        
        return res.status(201).json(card);
    });
});

/*
 * PROCEDURAL CODE
 */

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

module.exports.app = app;
module.exports.runServer = runServer;