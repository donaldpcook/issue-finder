'use strict';

var formController = function($scope, repos) {
  $scope.language = '';

  $scope.searchForTop = function() {
    repos.get({q: $scope.skill}).then(function(results) {
    });
  };
};

module.exports = formController;
