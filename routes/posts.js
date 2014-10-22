var express = require('express');
var router = express.Router();
var db = require('../db');
db = db.connection ;

// get all posts, return JSON
router.get('/', function(req, res) {

  var sql = 'SELECT * ';
  sql += 'FROM COMMENT ';
  sql += 'RIGHT JOIN POST ';
  sql += 'ON COMMENT.post_id=POST.post_id;';

  db.query(sql, function(err, posts) {
    if (err) {
      console.log(err);
      throw err;
    };
    var postsArray = [];
    var postIdIndex = [];
    for (i in posts) {

      var comment = {};
      if (posts[i].comment_content != null) {
        comment.comment_id = posts[i].comment_id;
        comment.comment_likes = posts[i].comment_likes;
        comment.comment_dislike = posts[i].comment_dislike;
        comment.comment_content = posts[i].comment_content;
        comment.comment_create_date = posts[i].comment_create_date;
        comment.comment_modify_date = posts[i].comment_modify_date;
      }

      if ( postIdIndex.indexOf(posts[i].post_id) < 0 ) {

        // create new post in postsArray
        var post = {};
        post.comments = [];

        post.post_id= posts[i].post_id;
        post.post_topic= posts[i].post_topic;
        post.post_content= posts[i].post_content;
        post.post_create_date= posts[i].post_create_date;
        post.post_modify_date= posts[i].post_modify_date;
        post.post_likes= posts[i].post_likes;
        if (posts[i].comment_content != null) {
          post.comments.push(comment);
        }

        postIdIndex.push(posts[i].post_id);
        postsArray.push(post);

      } else {

        for (j in postsArray) {
          if (postsArray[j].post_id == posts[i].post_id) {
            postsArray[j].comments.push(comment);
          }
        }

      }
    }
    res.json(postsArray);
  });
});

// create post
router.post('/', function(req, res) {

  var sql = 'INSERT INTO POST (user_id, post_topic, post_content, post_create_date, post_modify_date)';
  sql += 'VALUES ('+req.body.user_id+', "'+req.body.post_topic+'", "'+req.body.post_content+'", NOW(), NOW())';

  db.query(sql, function(err, post) {
      if (err) {
        console.log(err);
        res.json({message: 'error'});
        throw err;
      }
      res.json({message: 'success'});
  });

});

// update post
router.put('/:post_id', function(req, res) {

  var sql = 'UPDATE POST SET post_modify_date = NOW(), post_content = "' + req.body.post_content + '" WHERE post_id =' + req.params.post_id;

  db.query(sql, function(err, post) {
      if (err) {
        console.log(err);
        res.json({message: 'error'});
        throw err;
      }
      res.json({message: 'success'});
  });

});

// delete post
router.delete('/:post_id', function(req, res) {

  db.query('DELETE FROM POST WHERE post_id =' + req.params.post_id, function(err, post) {
    if (err) {
      console.log(err);
      res.json({message: 'error'});
      throw err;
    }
    res.json({message: 'success'});
  });

});

module.exports = router;
