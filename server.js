"use strict";

const express = require('express');
const app = express();

// this is a test comment

app.use(express.static('public')); 

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log('Server now running on port ', port);
});

exports.app = app;