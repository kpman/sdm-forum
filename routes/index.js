var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res) {
//   res.render('index');
// });

router.get('/', function(req, res) {
  res.json({message: 'index'});
});

module.exports = router;
