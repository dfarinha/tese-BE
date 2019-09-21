const mongoose = require('mongoose');
const sha256 = require('sha256');
const { Schema } = mongoose;


const BlocksSchema = new Schema({
    index: Number,
    timestamp: Date,
    issuer: String,
    newOwner : String,
    data : String,
    dataID : String,
    amount : Number,
    value : Number,
    prevHash : String,
    hash : String,
});

mongoose.model('Block', BlocksSchema);
