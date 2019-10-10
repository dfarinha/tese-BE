const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');
const Chains = mongoose.model('Chain')
const Invent = mongoose.model('Inventory')
const Block = require('./../../classes/blockClass');
const Chain = require('./../../classes/chainClass');
const Inventory = require('./../../classes/inventoryClass');


//      *** ADD PARTNER ***
router.post('/addpartner', auth.required, (req, res) => {
    const {
        payload: {
            id
        }
    } = req;
    console.log(id)

    Users.findOne({
        email: req.body.email
    }, (err, obj) => {
        if (err) {
            console.log(err)
            res.send(err)
        }
        console.log(obj)
        Users.findOneAndUpdate({
            _id: id
        }, {
            $push: {
                partners: obj._id
            }
        }, (err, user) => {
            if (err) return res.send(err)

            return res.send(user)
        })
    })
})

router.get('/showpartners', auth.required, (req, res) => {
    const {
        payload: {
            id
        }
    } = req;
    Users.findOne({
        _id: id
    },{partners:1}).populate('partners', 'name').exec(function (err, user) { //returns logged user  ??
        if (err) return console.log(err)
        console.log(user)
        res.send(user)
    })
})

router.post('deletepartner', auth.required, (req, res) => {
    const {
        payload: {
            id
        }
    } = req

    Users.findOneAndRemove({
        partners: req.body.email
    })
})

router.post('/addproduct', auth.required, (req, res) => {
    const {
        payload: {
            id
        }
    } = req;

    const x = new Inventory(req.body.name, req.body.amount, req.body.value)
    x.newProduct()
    findOneAndUpdate()

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