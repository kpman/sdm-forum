var config = {};
config.api = {};
config.api.url = 'http://localhost:3000';

(function() {

  var app = angular.module('mainApp', []);

  app.controller('mainCtrl', function($scope, $http) {

    $scope.newPost = {};
    $scope.newPost.topic = '';
    $scope.newPost.content = '';
    $scope.newPost.success = false;
    $scope.newPost.fail = false;

    var socket = io();
    socket.on('reload', function(msg){
      getAllPosts();
    });

    function getAllPosts() {
      $http.get(config.api.url + '/posts').
        success(function(data, status, headers, config) {
          $scope.posts = data;
        }).
        error(function(data, status, headers, config) {
          console.log(data);
          alert(data);
        });
    }
    getAllPosts();

    $scope.post = function() {
      $http.post(config.api.url + '/posts', 
        {
          "user_id": 1, 
          "post_topic": "this is post from angular",
          "post_content": "this is post content"
        }).
        success(function(data, status, headers, config) {
          console.log(data);
        }).
        error(function(data, status, headers, config) {
          console.log(data);
        });
    };

    $scope.createNewPost = function() {
      var r = confirm('確定要發佈貼文嗎？');
      if (r == true) {
        // post
        $http.post(config.api.url + '/posts', 
          {
            "user_id": 1,
            "post_topic": $scope.newPost.topic,
            "post_content": $scope.newPost.content
          }).
          success(function() {
            $scope.newPost.topic = '';
            $scope.newPost.content = '';
            $scope.newPost.success = true;
            socket.emit('change',{message:'change'});
            // getAllPosts();
          }).
          error(function() {
            console.log('ohno, 發生錯誤..請再試一次');
            $scope.newPost.fail = true;
          });
      };
    };

    $scope.deletePost = function() {
      var r = confirm("確定要刪除嗎？");
      if (r == true) {
          // delete
          $http.delete(config.api.url + '/posts/' + this.post.post_id).
            success(function(data, status, headers) {
              socket.emit('change',{message:'change'});
            }).
            error(function(data, status, headers, config) {
              alert(data);
            });
      } else {
          // do nothing;
      }
    };

    $scope.createNewComment = function() {
      var r = confirm("確定要留言嗎？");
      if (r == true) {
        $http.post(config.api.url + '/comments/' + this.post.post_id,
          {
            "user_id": 1, 
            "comment_content": this.newComment.content
          }).
        success(function(data, status, headers) {
          socket.emit('change',{message:'change'});
        }).
        error(function() {
          alert(data);
        })
      };
    };


  });
})();