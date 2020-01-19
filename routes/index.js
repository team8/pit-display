var express = require('express');
var router = express.Router();
const match = require('./tbaApi');
const json = require('../matchdata.json');
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(json);
  // var data = req.body
    res.render('index', { title: 'Team 8 Matches', array:json });
});
module.exports = router;