const express = require('express');
const router  = express.Router();

const P{rovider} = require("../models/Provider")
const Service = require("../models/service")

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
