var express = require('express');
var router = express.Router();
var db = require('../db');
db = db.connection;

// get all user list
router.get('/', function(req, res) {
  db.query('SELECT * FROM USER', function(err, users) {
    if (err) {
      console.log(err);
      throw err;
    }
    res.json(users);
  });
});


// create user
router.post('/', function(req, res) {

  var sql = 'INSERT INTO USER (user_nickname, user_account, user_password, user_department, user_email)';
  sql += 'VALUES ("' +req.body.user_nickname+ '", "' +req.body.user_account+ '", "' +req.body.user_password+ '", "' +req.body.user_department+ '", "' +req.body.user_email+ '")';

  db.query(sql, function(err, user) {
      if (err) {
        console.log(err);
        res.json({message: 'error'});
        throw err;
      }
      res.json({message: 'success'});
  });

});


module.exports = router;
