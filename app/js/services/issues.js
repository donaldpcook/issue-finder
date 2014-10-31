'use strict';

var issuesService = function($http, $q) {
  var issues = {};

  var deferred = $q.defer();

  issues.get = function(options) {
    options = angular.extend({}, options);

    var parameters = [];

    if (options.q) { parameters.push('q=' + options.q); }
    if (options.sort) { parameters.push('sort=' + options.sort); }

    $http.get('https://api.github.com/issues' +
      (parameters.length ? '?' + parameters.join('&') : '')
    )
      .then(function(results) {
        deferred.resolve(new Issues(results));
      });

    return deferred.promise;
  };

  return repos;
};

function Issues(results) {
  this.data = results.data.items;
}

Issues.prototype = {
};

module.exports = issuesService;
