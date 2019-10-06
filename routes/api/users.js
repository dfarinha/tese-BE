const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');
const Chains = mongoose.model('Chain')
const Inventories = mongoose.model('Inventory')
const Block = require('./../../classes/blockClass');
const Chain = require('./../../classes/chainClass');
const Inventory = require('./../../classes/inventoryClass');
const sha256 = require('sha256');

var ObjectID = require('mongodb').ObjectID;

//POST new user route (optional, everyone has access)
router.post('/', auth.optional, (req, res, next) => {
  const {
    body: {
      user
    }
  } = req;

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const finalUser = new Users(user);

  finalUser.setPassword(user.password);

  return finalUser.save()
    .then(() => {

      const user = finalUser.toAuthJSON()


      // Logica da chain inicial
      const newChain = new Chain(user._id)
      

      newChain.save((err, chain) => {
        if (err) return console.log(err)
        const genesisBlock = new Block(Date(), 'X', 'Y', 'Z', 0, 0, '0');
        genesisBlock.save(function (err, genesisBlock) {
          if (err) return console.log(err)

          chain.owner = user._id
          chain.blocks = [genesisBlock._id]
          chain.save(() => {})
          res.json({
            user
          })
        });
      })

    })
});


function farinhaAssincrono(callBack) {
  setTimeout(() => {
    console.log('farinha')
    callBack(null, 'farinha2')
  }, 3000);
}


farinhaAssincrono(function (err, result) {
  if (err) {
    console.log(err);

  } else {
    console.log(result);
  }
})



///   *** Populate list chains w/ owner(email) & blocks ***
router.get('/showchains', auth.optional, (req, res) => {


  Chains.find().populate('owner', 'email').populate('blocks').exec(function (err, chains) {
    if (err) return console.log(err)
    res.send(chains)
  })
})

///   **    Add a block to a specific chain   ** 
router.post('/addblocktochain', auth.required, (req, res) => {
  const {
    payload: {
      id
    }
  } = req;

  Chains.findOne({
    owner: id
  }).populate('owner').exec(function (err, chain) {

    var newOwnerName = chain.owner.name

    Chains.findOne({
      owner: id
    }).populate('blocks').exec((err, chain) => {


      var prevHash = chain.blocks[chain.blocks.length - 1].hash

      var blockTemp = new Block(new Date, newOwnerName, req.body.issuer, req.body.data, req.body.amount, req.body.value, prevHash)
      blockTemp.save((err, block) => {

        Chains.findOneAndUpdate({
          owner: id
        }, {
          $push: {
            blocks: block._id
          }
        }, (err, chain) => {
          if (err) {
            console.log(err)
            res.send(err)
          }
          Users.findOne({
            name: req.body.issuer
          }, (err, obj) => {



            Chains.findOne({
              owner: obj.id
            }).populate('blocks').exec((err, chain) => {


              var prevHash = chain.blocks[chain.blocks.length - 1].hash

              Users.findOne({
                name: req.body.issuer
              })
              var blockTemp = new Block(new Date, newOwnerName, req.body.issuer, req.body.data, req.body.amount, req.body.value, prevHash)
              blockTemp.save((err, block) => {


                Chains.findOneAndUpdate({
                  owner: obj.id
                }, {
                  $push: {
                    blocks: block._id
                  }
                }, (err, chain) => {
                  if (err) return res.send(err)

                  return res.send(chain)
                })
              })
            })
          })


        })
      })

      // Chains.findOne({owner: new ObjectID(id)},(err,chain)=>{
      //   if(err) return res.send(err)
      //   console.log(chain);

      //   chain.blocks.push(blockTemp)
      //   chain.save(_,(err,chain)=>{

      //     return res.send(chain)
      //   })

      // })
      // console.log(id);



    })
  })
})



router.get('/showchains', auth.required, (req, res) => {
  Chains.find().populate('owner', 'email').populate('blocks').exec(function (err, chains) {
    if (err) return console.log(err)
    res.send(chains)
  })
})


///////////////////////////////////////////     F I N D 

// app.get('/alberto', (req, res) => {
//   Block.find({issuer: 'Alberto'}, (err, blocks) => {
//       if (err) return console.error(err);
//       res.send(blocks)
//   })
// })
//                                        
// Kitten.find({
//   name: "Pancho"
// }, function (err, kittens) {
//   if (err) return console.error(err);
//   console.log(kittens);
// })

///////////////////////////////////////////

router.get('/tre', (req, res) => {
  res.send('here');
})

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
  const {
    body: {
      user
    }
  } = req;

  console.log(user);


  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', {
    session: false
  }, (err, passportUser, info) => {
    if (err) {
      return next(err);
    }

    if (passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({
        user: user.toAuthJSON()
      });
    }

    return res.status(403).send('Wrong Credentials')
  })(req, res, next);
});

//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req, res, next) => {
  const {
    payload: {
      id
    }
  } = req;

  return Users.findById(id)
    .then((user) => {
      if (!user) {
        return res.sendStatus(400);
      }

      return res.json({
        user: user.toAuthJSON()
      });
    });
});

module.exports = router;