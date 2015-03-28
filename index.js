'use strict';

var Promise = require('es6-promise').Promise;
var promiseSeries = require('promise-series-node');

module.exports = function(array, testCallback) {
  testCallback = testCallback || function() {}
  
  return new Promise(function(resolve, reject) {
    if(!(array instanceof Array) || !array.length) { //empty/non arrays can't pass any test
      return resolve(false);
    }
    promiseSeries(array, testCallback).then(function(results) {
      resolve(results.every(testCallback));
    });
  });
};