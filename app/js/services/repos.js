'use strict';

var exports = function($resource) {
  // $html encodes the plus to something that doesn't work with the API. Need to figure out a place to put it all
  var Repos = $resource(
    'https://api.github.com/search/issues?q=repo%3Amozilla%2Fshumway+repo%3Ascalyr%2Fangular'
  );

  return Repos;
};

module.exports = exports;
