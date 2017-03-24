'use strict';

let mongoose = require('mongoose');

// Don't need to use an object if you're just declaring the data type, but do it for consistency
let CardSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true },
    occupation: { type: String, required: true },
    professionalSummary: { type: String, required: true },
    company: { type: String },
    officePhone: { type: String },
    cellPhone: { type: String },
    addlNote: { type: String }
});

let Card = mongoose.model('Card', CardSchema);

module.exports = Card;