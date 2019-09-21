const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');
const Block = require('./../../classes/blockClass');
const Chain = require('./../../classes/chainClass');


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

      newChain.save((err, chain)=>{
        if (err) return console.log(err)
        const genesisBlock = new Block(0, Date(), 'X', 'Y', 'Z', '0', 0, 0, '0');
        genesisBlock.save(function (err, genesisBlock) {
          if (err) return console.log(err)
          console.log(genesisBlock)

          newChain.owner = user._id
          newChain.blocks = [genesisBlock._id]
          newChain.save(()=>{})
          res.json({
            user
          })
        });
      })

      })






  
});

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