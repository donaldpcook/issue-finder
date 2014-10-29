'use strict';

var reposService = function($http, $q) {
  var repos = {};

  var deferred = $q.defer();

  repos.get = function(options) {
    options = angular.extend({sort: 'stars'}, options);

    var parameters = [];

    if (options.q) { parameters.push('q=' + options.q); }
    if (options.sort) { parameters.push('sort=' + options.sort); }

    $http.get('https://api.github.com/search/repositories' +
      (parameters.length ? '?' + parameters.join('&') : '')
    )
      .then(function(results) {
        deferred.resolve(new Repos(results));
      });

    return deferred.promise;
  };

  return repos;
};

function Repos(results) {
  this.data = results.data.items;
}

Repos.prototype = {
  getFullNames: function() {
    return this.data.map(function(repo) {
      return repo.full_name;
    });
  },

  stringifyFullNames: function() {
    return 'repo:' + this.getFullNames().join('+repo:');
  }
};

module.exports = reposService;
