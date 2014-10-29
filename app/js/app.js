'use strict';

require('angular');
require('angular-resource');

angular.module('issueFinder', ['ngResource'])
  .config(function() {
  })

  .factory('repos', ['$resource', require('./services/repos')])

  .controller('FormController', ['$scope', require('./form/form')])

  .controller('AppController', ['$scope', 'repos', function($scope, repos) {
    repos.get().$promise.then(function(a, b) {
    });
  }]);
