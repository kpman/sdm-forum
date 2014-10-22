'use strict';

var app = angular.module('app', ['ngRoute', 'appControllers', 'appServices']);

var appServices = angular.module('appServices', []);
var appControllers = angular.module('appControllers', []);

var options = {};
options.api = {};
options.api.base_url = "http://localhost:3000";

app.config(['$locationProvider', '$routeProvider',
  function($location, $routeProvider) {
    $routeProvider.
    when('/', {
      templateUrl: 'partial/post.list.html',
      controller: 'PostListCtrl'
    }).
    when('/test', {
      templateUrl: 'partial/post.test.html',
      controller: 'PostTestCtrl'
    }).
    othersise({
      redirectTo: '/'
    });
  }
]);

appControllers.controller('PostListCtrl', ['$scope', '$sce', 'PostService',
  function PostListCtrl($scope, $sce, PostService) {
    console.log('in PostListCtrl');
    $scope.posts = [];

    PostService.getAllPosts().success(function(data) {
      console.log(data);
      $scope.posts = data;
    }).error(function(data, status)  {
      console.log(status);
      console.log(data);
    });
  }
]);

appControllers.controller('PostTestCtrl', ['$scope', 'PostService',
  function PostTestCtrl($scope, PostService) {
    console.log('in PostTestCtrl');
    $scope.posts = [];

    PostService.test().success(function(data) {
      console.log(data);
    });
  }
]);

appServices.factory('PostService', function($http) {
  return {
    getAllPosts: function() {
      return $http.get(options.api.base_url + '/posts');
    },
    test: function() {
      return 'test';
    }
  };
});

app.run(function($scope, $location) {
  $scope.$on('$routeChangeStart', function(event, next, current) {
    console.log('test');
  });
});
