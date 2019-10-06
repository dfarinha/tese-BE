const sha256 = require('sha256');
const mongoose = require('mongoose');
const BlockModel = mongoose.model('Block');

class Block {
    constructor(timestamp, issuer, newOwner, data, amount, value, prevHash) {
        this.timestamp = timestamp;
        this.issuer = issuer;
        this.newOwner = newOwner;
        this.data = data;
        this.dataID = sha256(issuer + data)+'';
        this.amount = amount;
        this.value = value;
        this.prevHash = prevHash;
        this.hash = sha256(
            this.timestamp + this.issuer + this.newOwner +
            this.data + this.dataID + this.amount + this.value + this.prevHash
        )+'';
    }

    save(cb) {

        const block = new BlockModel(this)

        block.save((err, block) => {
            cb(err, block)
        })

    }
}

module.exports = Block;