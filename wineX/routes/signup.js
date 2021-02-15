const router = require("express").Router();
const User = require ("../models/User.model")
//const bcrypt = require('bcrypt');

router.get("/signup", (req, res, next) => {
    res.render("user/signup")
    .catch(err => {
        console.log(err);
      })
  });

router.post("/signup", (req, res, next) => {
    User.create({username, password, email, dateOfBirth, imgPath})
    .then(user => {
        console.log(user)
    })
    .catch(err => {
        next(err);
    })
})

module.exports = router;