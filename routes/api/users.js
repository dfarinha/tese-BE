const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');
const Chains = mongoose.model('Chain')
// const Inventory = mongoose.model('Inventory')
const Block = require('./../../classes/blockClass');
const Chain = require('./../../classes/chainClass');
const Invent = require('./../../classes/inventoryClass');


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
        const genesisBlock = new Block(0, Date(), 'X', 'Y', 'Z', '0', 0, 0, '0');
        genesisBlock.save(function (err, genesisBlock) {
          if (err) return console.log(err)
          console.log(genesisBlock)

          newChain.owner = user._id
          newChain.blocks = [genesisBlock._id]
          newChain.save(() => {})
          res.json({
            user
          })
        });
      })

    })
});

router.post('/addblock/:id', (req, res) => {
  console.log(req.body);
  const block = new Block({
    index: returnLastIndex(),
    timestamp: Date(),
    issuer: req.body.timestamp,
    newOwner: req.body.newOwner,
    data: req.body.data,
    dataID: sha256(issuer + data),
    amount: req.body.amount,
    value: req.body.amount,
    prevHash: returnLastHash(),
    hash: sha256(this.index + this.timestamp + this.issuer + this.newOwner +
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



///   *** Populate list chains w/ owner(email) & blocks ***
router.get('/showchains', auth.optional, (req, res) => {
  Chains.find().populate('owner', 'email').populate('blocks').exec(function (err, chains) {
    if (err) return console.log(err)
    res.send(chains)
  })
})

///   **    Add a block to a specific chain   **
// router.post('/addblock', auth.optional, (req, res) => {
//   var blockTemp = {''}
// })



// router.get('/abc', auth.optional, (req, res) => {
//   Users.findOne({ email: 'qwertay@gmail.com' }, function(error, story) {
//     if (error) {
//       return handleError(error);
//     }
//     story.author = author;
//     console.log(story.author.name); // prints "Ian Fleming"
//   });
//   res.send('abc')
// })

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