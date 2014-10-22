var express = require('express');
var router = express.Router();
var db = require('../db');

// get all comment
router.get('/', function(req, res) {
  var sql = 'SELECT * FROM COMMENT';
  db.query(sql, function(err, comments) {
    if (err) {
      console.log(err);
      throw err;
    }
    res.json(comments);
  });
});

// create comment
router.post('/:post_id', function(req, res) {
  var sql = 'INSERT INTO COMMENT (user_id, post_id, comment_likes, comment_dislike, comment_content, comment_create_date, comment_modify_date)';
  sql += 'VALUES ( '+req.body.user_id+' , "'+req.params.post_id+'", 0, 0, "'+req.body.comment_content+'" , NOW(), NOW())';
  db.query(sql, function(err, comment) {
      if (err) {
        console.log(err);
        res.json({message: 'error'});
        throw err;
      }
      res.json({message: 'success'});
  });
});

// delete comment
router.delete('/:comment_id', function(req, res) {
  db.query('DELETE FROM COMMENT WHERE comment_id =' + req.params.comment_id, function(err, comment) {
    if (err) {
      console.log(err);
      res.json({message: 'error'});
      throw err;
    }
    res.json({message: 'success'});
  });
});

module.exports = router;
