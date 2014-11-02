'use strict';

var formController = function($scope, repos, issues, data) {
  $scope.language = '';

  $scope.searchForTop = function() {
    repos.get({q: $scope.skill}).then(function(results) {
      issues.get({q: results.stringifyFullNames()}).then(function(results) {
        data.setResults(results);
      });
    });
  };
};

module.exports = formController;
