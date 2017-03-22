(function() {

  var app = angular.module("githubViewer", []);

  var MainCtrl = function($scope, $http, $interval) {

    var onUserComplete = function(response) {
      $scope.user = response.data;
      $http.get($scope.user.repos_url)
        .then(onRepos, onError);
    };
    
    var onRepos = function(response) {
      $scope.repos = response.data;
    };

    var onError = function(reason) {
      $scope.error = "Could not fetch response";
    };

    var decrementCountdown = function() {
      $scope.countdown -= 1;
      if($scope.countdown < 1) {
        $scope.search($scope.username);
      }
    };

    $scope.search = function(username) {
      $http.get("https://api.github.com/users/" + username)
      .then(onUserComplete, onError);
    };
    
    var startCountdown = function() {
      $interval(decrementCountdown, 1000, $scope.countdown);
    };

    $scope.username = "angular";
    $scope.message = 'Github Viewer';
    $scope.repoSortOrder = '-stargazers_count';
    $scope.countdown = 5;
    startCountdown();
  };

  app.controller("MainCtrl", MainCtrl);
}());