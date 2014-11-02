'use strict';

var issuesService = function($http, $q) {
  var issues = {};

  var deferred = $q.defer();

  issues.get = function(options) {
    options = angular.extend({
      labels: ''
    }, options);

    var parameters = [];

    if (options.q) { parameters.push('q=' + options.q); }
    if (options.labels) { parameters.push('label:' + options.labels); }

    $http.get('https://api.github.com/search/issues' +
      (parameters.length ? '?' + parameters.join('+') : '')
    )
      .then(function(results) {
        deferred.resolve(new Issues(results));
      });

    return deferred.promise;
  };

  return issues;
};

function Issues(results) {
  this.data = results.data.items.map(function(issue) {
    return new Issue(issue);
  });
}

Issues.prototype = {
};

function Issue(issue) {
  this.data = issue;
}

Issue.prototype = {
};

module.exports = issuesService;
