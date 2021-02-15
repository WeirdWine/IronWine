const router = require("express").Router();
const User = require ("../models/User.model")
const bcrypt = require('bcrypt');

router.get("/signup", (req, res, next) => {
    res.render("user/signup")
    .catch(err => {
        console.log(err);
      })
  });

router.post("/signup", (req, res, next) => {
    const {username, password, email, dateOfBirth, imgPath} = req.body
    
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt)
    
    const today = new Date()
    const thisYear = today.getFullYear()
    const userDateOfBirth = new Date(dateOfBirth).getFullYear()
    
    if (password.length < 8) {
        return res.render("user/signup", { message: "Your password must be more than 8 characters"
    });
    }

    if (userDateOfBirth > (thisYear - 19)) {
        return res.render("user/signup", { message: "You must be of legal drinking age (18+) to enter"
    });
    } else {res.render("user/login")}
   
    //if (dateOfBirth > )
    
    User.create({
        username: username,
        password: hash,
        email: email,
        dateOfBirth: dateOfBirth,
        imgPath: imgPath})
    .then(newUser => {
        
        res.render("user/login")
    })
    .catch(err => {
        next(err);
    })
})

module.exports = router;