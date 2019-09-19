const mongoose = require('mongoose');
const {
    Schema
} = mongoose;
const sha256 = require('sha256');

const BlocksSchema = new schema({
    index: Number,
    timestamp: Date,
    issuer: String,
    newOwner = String,
    data = String,
    dataID = Number,
    amount = Number,
    value = Number,
    prevHash = String,
    hash = String,
});

mongoose.model('Block', BlocksSchema);
