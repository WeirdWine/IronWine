const router = require("express").Router();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
 
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

router.get("/login", (req, res, next) => {
    res.render("user/login")
  });

router.post('/login', passport.authenticate('local', {
    successRedirect: '/wines',
    failureRedirect: '/login',
    passReqToCallback: true
  })
  )
/*
router.get('/private', (req, res) => {
    if (!req.user) {
    res.redirect('/login');
    return;
    }
  
    res.render('/private', { user: req.user });
  });
*/

  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
  });

module.exports = router;