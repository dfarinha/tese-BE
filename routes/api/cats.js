const mongoose = require("mongoose");
const router = require("express").Router();

router.post("/", (req, res, next) => {
  const {body: { name }} = req;

  console.log('body', req.body);
  

  if (!name) {
    return res.status(422).json({
      errors: {
        name: "is required"
      }
    });
  }
  const Cat = mongoose.model("Cat", {
    name: String
  });

  const kitty = new Cat({
    name: name
  });
  kitty.save((err, cat) => {
    if (err) {
      console.log("erro a gravar", err);
    } else {console.log("This cat was saved:", cat);
      res.send('Saved '+ cat)
    }
  });
});

module.exports = router;