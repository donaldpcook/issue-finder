'use strict';

var reposService = function($resource) {
  var Repos = $resource(
    'https://api.github.com/search/repositories',
    {
      q: '@q',
      sort: 'stars'
    }
  );

  return Repos;
};

module.exports = reposService;
