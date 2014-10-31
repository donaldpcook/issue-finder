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
        },
        'results': {
          controller: 'ResultsController',
          templateUrl: '/results/results.tpl.html'
        }
      }
    });
  }])

  .factory('repos', require('./services/repos'))
  .factory('issues', require('./services/issues'))

  .controller('FormController', require('./form/form'))
  .controller('ResultsController', require('./results/results'))

  .controller('AppController', function($scope) {
  });
