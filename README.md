# Promise Every Series

Given an array of methods that return promises, execute in series and return true if all satisfy a test.

This library is useful when having a set of prioritized promises to check, and you'd like to test the fast(cheap) calls first, short circuiting if they fail the test.

For example, if you needed to check several conditions, involving synchronous code(fast), local database calls(less fast), and third party services(slow), you'd want to execute the fast one first, followed by the slower ones, and so forth, stopping immediately if any fail the test.

## Installation
```$ npm install promise-every-series```

## Basic Usage

```javascript
var everySeries = require('promise-every-series');

var superFast = function() {
  return new Promise(function(resolve, reject) {
    console.log('superFast ran!');
    resolve(true);
  });
};

var sortaSlow = function() {
  return new Promise(function(resolve, reject) {
    console.log('sortaSlow ran!');
    resolve(false);
  });
};

var superDuperSlow = function() {
  return new Promise(function(resolve, reject) {
    console.log('superDuperSlow ran!');
    resolve(true);
  });
};

promiseSeries([superFast, sortaSlow, superDuperSlow], function(res) {
  return res === true; //only promises that resolve(true) pass the test
}).then( (result) => {
  console.log(result);
});
```
This will print:
```javascript
superFast ran!
sortaSlow ran!
false  //note that superDuperSlow did not run
```

## Inputs
Empty arrays or failing to provide a valid callback immediately resolve as false.
```javascript
everySeries([]).then( (data) => {
  console.log(results); //false
});
```
This will print:
```javascript
false
```