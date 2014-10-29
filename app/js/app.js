'use strict';

require('angular');
require('angular-resource');
require('angular-ui-router');

angular.module('issueFinder', ['ngResource', 'ui.router', 'partials'])
  .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider.state('home', {
      url: '/home',
      views: {
        'input': {
          controller: 'FormController',
          templateUrl: '/form/form.tpl.html'
        }
      }
    });
  }])

  .factory('repos', ['$resource', require('./services/repos')])

  .controller('FormController', ['$scope', require('./form/form')])

  .controller('AppController', ['$scope', 'repos', function($scope, repos) {
    repos.get().$promise.then(function(a, b) {
    });
  }]);
