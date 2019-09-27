const express = require('express');
const router  = express.Router();
const User = require('../models/User');
const Service = require('../models/Ha');
const Provider = require('../models/Provider');
const Event = require('../models/Event');

router.get('/details/:searchFor/:theId', (req, res, next) => {
  if(!req.user){
    req.flash('error', `Sorry, you are not logged in!`);
    res.redirect('/');
  } else if(req.user.role !== "Boss") {
    req.flash('error', `Sorry ${req.user.username}, you are not the boss!`);
    res.redirect('/');
  }

  let searchParam;
  let isUser = false;
  let isProvider = false;
  let isService = false;

  if(req.params.searchFor === 'User') {
    searchParam = User.findById(req.params.theId);
    isUser = true;
  } else if(req.params.searchFor === 'provider') {
    searchParam = Provider.findById(req.params.theId);
    isProvider = true;
  } else if(req.params.searchFor === 'Service') {
    searchParam = Service.findById(req.params.theId);
    isService = true;
  } else {
    req.flash('error', `Sorry ${req.user.username}, you did not have the required fields`);
    res.redirect('/');
  }

  console.log("the search param ========================= ", searchParam);
  searchParam.then(theInfo => {
    console.log('the info -------- ', theInfo);
    let theTitle;

    if(isUser) {
      theTitle = theInfo.username;
    } else if(isProvider) {
      theTitle = theInfo.title;
    } else {
      theTitle = theInfo.name;
    }

    data = {
      isUser: isUser,
      isProvider: isProvider,
      isService: isService,
      pageTitle: theTitle,
      info: theInfo
    };
    res.render('user/adminDetails', data);
  }).catch(err => next(err));
});