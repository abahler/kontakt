'use strict';

let mongoose = require('mongoose');

// Don't need to use an object if you're just declaring the data type, but do it for consistency
let MessageSchema = new mongoose.Schema({
    from: { type: String, required: true },
    dateTime: { type: Date, default: Date.now },
    subject: { type: String },
    message: { type: String, required: true },
    read: { type: Boolean, default: false }
});

let Message = mongoose.model('Message', MessageSchema);

module.exports = Message;