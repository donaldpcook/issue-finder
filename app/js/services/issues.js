'use strict';

var issuesService = function($http, $q) {
  var issues = {};

  var deferred = $q.defer();

  issues.get = function(options) {
    options = angular.extend({
      label: 'documentation',
      state: 'open'
    }, options);

    var parameters = [];

    if (options.q) { parameters.push('q=' + options.q); }
    if (options.label) { parameters.push('label:' + options.label); }
    if (options.state) { parameters.push('state:' + options.state); }

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
