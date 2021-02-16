const router = require("express").Router();
const { uploader, cloudinary } = require("../config/cloudinary");
const User = require ("../models/User.model")
const bcrypt = require('bcrypt');
const passport = require('passport');

router.get("/signup", (req, res, next) => {
    res.render("user/signup")
  });

router.post("/signup", uploader.single("photo"), (req, res, next) => {
    const {firstName, surname, username, password, email, dateOfBirth, imgPath} = req.body
    
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt)
    
    const today = new Date()
    const thisYear = today.getFullYear()
    const userDateOfBirth = new Date(dateOfBirth).getFullYear()
    
    if (username === '') {
        res.render("user/signup", { message: "Your username cannot be empty" });
        return
      }

    if (password.length < 8) {
        return res.render("user/signup", { message: "Your password must be more than 8 characters"
    });
    }

    if (dateOfBirth === null) {
      return res.render("user/signup", { message: "You must enter a date of birth to enter"
    });
    }

    if (userDateOfBirth > (thisYear - 19)) {
        return res.render("user/signup", { message: "You must be of legal drinking age (18+) to enter"
    });
    } 

    User.findOne({ username: username })
    .then(userFromDB => {
      if (userFromDB !== null) {
        res.render("user/signup", { message: "Username is already taken. Please choose another." });
      } else {
        User.create({
            firstName: firstName,
            surname: surname,
            username: username,
            password: hash,
            email: email,
            dateOfBirth: dateOfBirth,
            imgName: req.file.originalname,
            imgPath: req.file.path,
            publicId: req.file.filename
          })
        .then(newUser => {
            req.login(newUser, err => {
              if (err) {
                next(err)
              } else {
                res.redirect("/wines")
              }
            })
        })
      }
})
})

module.exports = router;