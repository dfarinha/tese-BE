const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Block');
const sha256 = require('sha256');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const chains = []

class Chain {
    constructor(id) {
        this.blocks = []
        this.id = id
    }
    addBlock(block) {
        this.blocks.push(block)
    }
    getBlock(index) {
        return this.blocks[index]
    }
    getLatestBlock() {
        return this.blocks[this.blocks.length - 1];
    }
    getAllBlocks() {
        for (let i = 0; i < this.blocks.length; i++) {
            const element = this.blocks[i];
            console.log(element);
        }
    }
    getChainById(id) {
        return chain.filter(chain => chain.id == id);
    }
    returnLastHash() {
        return this.blocks[this.blocks.length - 1].prevHash;
    }
}

class Block {
    constructor(index, timestamp, issuer, newOwner, data, dataID, amount, value, prevHash) {
        this.index = index;
        this.timestamp = timestamp;
        this.issuer = issuer;
        this.newOwner = newOwner;
        this.data = data;
        this.dataID = dataID;
        this.amount = amount;
        this.value = value;
        this.prevHash = prevHash;
        this.hash = sha256(
            this.index + this.timestamp + this.issuer + this.newOwner +
            this.data + this.dataID + this.amount + this.value + this.prevHash
        );
    }
}


//      **  Receives the chain id where the new block is to be added  **
app.post('/addblock/:id', (req, res) => {
    console.log(req.body);
    const block = new Block({
        index: req.body.index,
        timestamp: Date(),
        issuer: req.body.timestamp,
        issuer: req.body.issuer,
        newOwner: req.body.newOwner,
        data: req.body.data,
        dataID: sha256(issuer + data),
        amount: req.body.amount,
        value: req.body.amount,
        prevHash: returnLastHash(),
        hash: sha256(this.index + this.timestamp + this.issuer + this.newOwner +
            this.data + this.dataID + this.amount + this.value + this.prevHash)
    })
    block.save(function (err, block) {
        if (err) return console.log(err)
    })
    //Local memory storage ... 
    res.send('Added')
    
})

//      **  Queries the blockchain by blockchain ID  **
app.get('/blockchain/:id', (req, res) => {
    res.send(getChainById(req.params.id));
})

//      **  Creates a new blockchain for a new user  **
app.post('/newblockchain/:id', (req, res) => {
    const newChain = new Chain(this.Users.id)
    const genesisBlock = new Block(0, Date(), 'X', 'Y', 'Z', '0', 0, 0, '0');
    genesisBlock.save(function (err, genesisBlock) {
        if (err) return console.log(err)
    })
})