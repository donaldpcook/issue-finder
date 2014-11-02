'use strict';

var dataService = function() {
  var data = {};
  return {
    setResults: function(results) {
      data.results = results;
    },

    getResults: function() {
      return data.results;
    }
  }
};

module.exports = dataService;

