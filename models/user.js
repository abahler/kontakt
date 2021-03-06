'use strict';

let mongoose = require('mongoose');
let Card = require('./card');

// Don't need to use an object if you're just declaring the data type, but do it for consistency
// Sets a unique index, so you don't need the 'index' key
let UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String },
    kontakts: { type: Array, "default": [] }
});

let User = mongoose.model('User', UserSchema);

module.exports = User;