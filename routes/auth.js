const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const User    = require('../models/user');
const passport = require('passport');
const ensureLogin = require("connect-ensure-login");

router.get('/signup', (req, res, next)=>{
    res.render('auth/signup');
});

router.post('/signup', (req, res, next)=>{

    const thePassword = req.body.thePassword;
    const theUsername = req.body.theUsername;

    const salt = bcrypt.genSaltSync(12);
    const hashedPassWord =  bcrypt.hashSync(thePassword, salt);

    User.create({
        username: theUsername,
        password: hashedPassWord
    })
    .then(newlyCreatedUser=>{
        console.log('Congrats');
        req.flash('success', `Congratulations ${newlyCreatedUser.username} on creating a new user!`);
        res.redirect('/');
    })
    .catch((err)=>{
        next(err);
    });
});


router.get('/login', (req, res, next)=>{
    res.render('auth/login');
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
    passReqToCallback: true
  }));

  router.post('/logout', (req, res, next)=>{
    console.log ("this is the log out ")
        req.session.destroy();
    
        res.redirect('/');
    
    })


  router.get('/logout', (req, res, next)=>{
    console.log ("You Are Logged Out");
    req.logout();
    res.redirect('/');
  });

module.exports = router;