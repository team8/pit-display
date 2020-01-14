var express = require('express');
var router = express.Router();
const match = require('./tbaApi')

/* GET home page. */
router.get('/', function(req, res, next) {
  // var data = req.body
  match.matchData('2019casj').then(snapshot => {
    res.render('index', { title: 'Team 8 Matches', array: snapshot });
  })
});

module.exports = router;
