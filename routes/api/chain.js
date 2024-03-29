const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const sha256 = require('sha256');
const Chain = require('./../../classes/chainClass');
const Block = require('./../../classes/blockClass');
const mongoose = require('mongoose');
const Chains = mongoose.model('Chain')

// const auth = require('../auth');



//      **  Receives the chain id where the new block is to be added  **
router.post('/addblock/:id', (req, res) => {
    console.log(req.body);
    const block = new Block({
        timestamp: Date(),
        issuer: req.body.issuer,
        newOwner: req.body.newOwner,
        data: req.body.data,
        dataID: sha256(issuer + data),
        amount: req.body.amount,
        value: req.body.amount,
        prevHash: returnLastHash(),
        hash: sha256(this.timestamp + this.issuer + this.newOwner +
            this.data + this.dataID + this.amount + this.value + this.prevHash)
    })
    block.save((err, block) => {
        if (err) {
            console.log('Error saving block');
            return res.status(400).send()
        }
        res.send('Added')
    })
    //Local memory storage ... 

})

router.get('/:id', auth.required, (req, res) => {
    Chains.findById(req.params.id).populate('blocks').populate('owner').exec(function (err, chain) {
        if (err) return console.log(err)
        res.send(chain)
    })
})




module.exports = router;