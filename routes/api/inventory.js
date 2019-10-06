const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');
const Chains = mongoose.model('Chain')
const Invent = mongoose.model('Inventory')
const Block = require('./../../classes/blockClass');
const Chain = require('./../../classes/chainClass');
const inventoryClass = require('./../../classes/inventoryClass');



router.post('/addpartner', auth.required, (req, res) => {
    const {
        payload: {
            id
        }
    } = req;

    Users.findOneAndUpdate({email: req.body.email}, (err, obj) => {
        
    })
})


router.get('/show', (req, res) => {
    res.send("yaaaaaaa")
})


router.get('/showinvents', auth.required, (req, res) => {

    const {
        payload: {
            id
        }
    } = req;





})

module.exports = router;