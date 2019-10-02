const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const sha256 = require('sha256');
const Chain = require('./../../classes/chainClass');
const Block = require('./../../classes/blockClass');
const mongoose = require('mongoose');
// const auth = require('../auth');

const chains = []


//      **  Receives the chain id where the new block is to be added  **
router.post('/addblock/:id', (req, res) => {
    console.log(req.body);
    const block = new Block({
        index: returnLastIndex(),
        timestamp: Date(),
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
    block.save((err,block)=>{
        if (err) {
            console.log('Error saving block');
            return res.status(400).send()
        }
        res.send('Added')
    })
    //Local memory storage ... 

})

//      **  Queries the blockchain by blockchain ID  **
router.get('/blockchain/:id', (req, res) => {
    res.send(getChainById(req.params.id));
})

//      **  Creates a new blockchain for a new user  **
router.post('/newblockchain/:id', (req, res) => {
    const newChain = new Chain(this.Users.id)
    const genesisBlock = new Block(0, Date(), 'X', 'Y', 'Z', '0', 0, 0, '0');
    genesisBlock.save(function (err, genesisBlock) {
        if (err) return console.log(err)
    })
})

module.exports = router;
