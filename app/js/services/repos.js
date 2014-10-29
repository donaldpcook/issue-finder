'use strict';

var exports = function($resource) {
  var Repos = $resource(
    'https://api.github.com/search/repositories',
    {
      q: '@q',
      sort: 'stars'
    }
  );

  return Repos;
};

module.exports = exports;
