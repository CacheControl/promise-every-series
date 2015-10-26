'use strict'

var Promise = require('es6-promise').Promise
var expect = require('chai').expect

var promiseEvery = require('../index.js')

function promiseMethodFactory (ret) {
  return function () {
    return new Promise(function (resolve, reject) {
      resolve(ret)
    })
  }
}

var g = promiseMethodFactory('g')
var h = promiseMethodFactory('h')
var i = promiseMethodFactory('i')

describe('promiseEvery', function () {
  it('it returns true if all methods pass the test', function (done) {
    promiseEvery([g, h, i], function (v) {
      return ['g', 'h', 'i'].indexOf(v) > -1
    }).then(function (result) {
      expect(result).to.be.true
      done()
    }).catch(done)
  })

  it('it returns false if one of the methods does not pass the test', function (done) {
    promiseEvery([g, h, i], function (v) {
      return ['g', 'h'].indexOf(v) > -1
    }).then(function (result) {
      expect(result).to.be.false
      done()
    }).catch(done)
  })

  it('it executes serially, halting as soon as the first promise fails to pass the test', function (done) {
    promiseEvery([g, h, i], function (v) {
      expect(v).to.equal('g')
      return false
    }).then(function (result) {
      expect(result).to.be.false
      done()
    }).catch(done)
  })

  describe('input cases', function () {
    it('if given an empty array, returns false', function (done) {
      promiseEvery([], function (v) {
        expect(v).to.not.exist
      }).then(function (result) {
        expect(result).to.be.false
        done()
      }).catch(done)
    })

    it('if given no callback, returns false', function (done) {
      promiseEvery([g]).then(function (result) {
        expect(result).to.be.false
        done()
      }).catch(done)
    })
  })
})
