const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');
const Chains = mongoose.model('Chain')
const Invent = mongoose.model('Inventory')
const Final = mongoose.model('Final')
const Block = require('./../../classes/blockClass');
const Chain = require('./../../classes/chainClass');
const FinalProduct = require('../../classes/finalClass');
const Inventory = require('./../../classes/inventoryClass');
var generator = require('generate-serial-number');


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
            return res.send(err)
        }
        if (!obj) {
            return res.status(400).send('Partner doesnt exist')
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

router.post('/deletepartner', auth.required, (req, res) => {
    const {
        payload: {
            id
        }
    } = req;
    // console.log(id)

    // Users.findOne({
    //     email: req.body.email
    // }, (err, obj) => {
    //     if (err) {
    //         console.log(err)
    //         res.send(err)
    //     }
    //     console.log(obj)
    //     Users.findOneAndUpdate({
    //         _id: id
    //     }, {
    //         $pull: {
    //             partners: obj._id
    //         }
    //     }, (err, user) => {
    //         if (err) return res.send(err)

    //         return res.send(user)
    //     })
    // })




    Users.findOneAndUpdate({
        _id: id
    }, {
        $pull: {
            partners: req.body.item
        }
    }, (err, obj) => {
        if (err) return res.send(err)

        return res.send(obj)
    })





})

//      *** SHOWS PARTNERS ***
router.get('/showpartners', auth.required, (req, res) => {
    const {
        payload: {
            id
        }
    } = req;
    Users.findOne({
        _id: id
    }, {
        partners: 2
    }).populate('partners').exec(function (err, user) { //returns logged user  ??
        if (err) return console.log(err)
        console.log(user)
        res.send(user)
    })
})

// router.post('deletepartner', auth.required, (req, res) => {
//     const {
//         payload: {
//             id
//         }
//     } = req

//     Users.findOneAndRemove({
//         partners: req.body.email
//     })
// })

//      *** ADDS PRODUCT ***
router.post('/addproduct', auth.required, (req, res) => {
    const {
        payload: {
            id
        }
    } = req;

    const x = new Inventory()
    prod = x.newProduct(req.body.name, req.body.amount, req.body.value)
    Invent.findOneAndUpdate({
        owner: id
    }, {
        $push: {
            products: prod
        }

    }, (invent) => {
        return res.send(invent)
    })
})

router.post('/addfinal', auth.required, (req, res) => {
    const {
        payload: {
            id
        }
    } = req;

     console.log(req.body);


    const x = new FinalProduct(req.body.name, id, req.body.blocks)
    x.save((err, result) => {
        if (err) {
            console.log(err);
            return res.send(err)

        }
        res.send(result)
    })
})


// router.post('/getfinal', auth.optional, (req, res) => {

//      console.log(req.body);

//      Final.findOne({
//         serial: req.body.serial
//     }).populate('blocks').populate('manufacturer').exec(function (err, obj) { 
//         if (err) return console.log(err)
//         console.log(obj)
//         res.send(obj)
//     })
// })

router.get('/getfinal/:serial', auth.optional, (req, res) => {
    // Chains.findById(req.params.id).populate('blocks').populate('owner').exec(function (err, chain) {
    //     if (err) return console.log(err)
    //     res.send(chain)
    // })

    Final.findOne({
        serial: req.params.serial
    }).populate('blocks').populate('manufacturer').exec(function (err, obj) { 
        if (err) return console.log(err)
        console.log(obj)
        res.send(obj)
    })
})


router.post('/deleteproduct', auth.required, (req, res) => {
    const {
        payload: {
            id
        }
    } = req;

    // Invent.findOneAndRemove({
    //     _id: req.body
    // }, function(err, res) {
    //     if (err) return console.log(err)
    //     res.send(res)
    // }
    // )
    // console.log('removed')


    // Invent.findOne({
    //     owner: id
    // }, (err, obj) => {

    // }

    // )

    // Invent.update(
    //     { owner: id },
    //     {$pull: {_id: req.body.item}}

    //     ), (invent) => {
    //         console.log(invent)
    //         console.log('entrou')
    //         return res.send(invent)
    //     }
    // Invent.findOneAndUpdate({
    //     owner: id
    // }, {
    //     $pull: {
    //         _id: req.body.item
    //     }

    // }, (invent) => {
    //     return res.send(invent)
    // })

    // Invent.update({_id: id}, {
    //     $pull: {
    //       "products": {
    //         _id: req.body.item
    //       }
    //     }
    //   });

    // Invent.update({
    //     owner : id} , {
    //         $pull:{"products":{_id : req.body.item}}
    //     }, res.send('asd'))

    // Invent.update({
    //     owner: id
    // }, {
    //     $pull: {
    //         "products._id" : req.body.item
    //     }
    // }, res.send('ok')  )       esta é boa

    // Invent.findOneAndUpdate(
    //     { owner : id }, 
    //     { $pull: { "products.$._id": "req.body.item" } } 
    // )

    // Invent.update(
    //     {owner: id}, 
    //     { $pull: { "products" : { 'req.body.item' } } }
    // );

    //     Invent.findOneAndUpdate({
    //         owner: id
    //       }, {
    //         $pull: {
    //           "products._id" : req.body.item
    //         }
    //       }, (err, obj) => {
    //         if (err) return res.send(err)

    //         return res.send(obj)
    //       }


    Invent.findOneAndUpdate({
        owner: id
    }, {
        $pull: {
            products: {
                _id: req.body.item
            }
        }
    }, (err, obj) => {
        if (err) return res.send(err)

        return res.send(obj)
    })

    // Invent.update({
    //         owner: id
    //     }, {
    //         $pull: {
    //             products: {
    //                 _id: req.body.item
    //             }
    //         }
    //     },
    //     console.log('deleted'));


})


router.get('/show', (req, res) => {
    res.send("yaaaaaaa")
})

//      *** shows logged user's inventory ***
router.get('/showinvent', auth.required, (req, res) => {

    const {
        payload: {
            id
        }
    } = req;

    Invent.findOne({
        owner: id
    }, function (err, obj) {
        if (err) return console.log(err)
        res.send(obj)
        console.log(obj)
    })

})

//      *** shows partner's inventories ***
router.get('/showinventories', auth.required, (req, res) => {

    const {
        payload: {
            id
        }
    } = req;

    // Users.findOne({
    //     _id: id
    // }).exec(function(err, obj) {
    //     Invent.findOne({
    //         owner: id
    //     }).exec(function(err, inv) {
    //         Invent.find( { "inv.owner": {$in: obj.partners} })
    //     }, cb)
    //     res.send(cb)
    // })

    // Users.findOne({
    //     _id: id
    // }).exec(function(err, obj) {
    //     Invent.find( {'owner': {$in: obj.partners}})
    // })

    // Users.findOne({
    //     owner: id
    // }, function(err, obj) {
    //     Invent.find( {'owner': {$in: 'obj.partners'}})
    // }).exec(function(err, inv) {
    //     console.log(obj.partners)
    //     res.send(inv)
    // })

    Users.findById(id, function (err, user) {
        if (err) {
            console.log(err);
            return res.send(err)
        }
        Invent.find({
            'owner': {
                $in: user.partners
            }
        }).populate('owner').exec(function (err, inv) {
            if (err) return console.log(err)
            console.log(inv)
            res.send(inv)
        })
    })



})

module.exports = router;