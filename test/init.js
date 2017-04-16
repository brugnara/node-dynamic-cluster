/**
 * Created by brugnara on 16/04/2017,
 * @ daniele@brugnara.me
 */

'use strict';

// test requirements
const should = require('should');

// utils
const debug = require('debug')('test:node-dynamic-cluster:init');

// module to test
const Module = require('../');

describe('# init', function () {

  describe('options', function () {

    let module;

    it('should throw an error if worker callback is missing', function () {
      (() => {
        Module()
      }).should.throw('missing `workerStart` function');
    });

    it('should throw an error if options is missing', function () {
      (() => {
        Module(() => {
          // junk
        })
      }).should.throw('missing or wrong clusterSize');
    });

    it('should throw an error if options.clusterSize is missing 1', function () {
      (() => {
        Module(() => {
          // junk
        }, {})
      }).should.throw('missing or wrong clusterSize');
    });

    it('should throw an error if options.clusterSize is missing 2', function () {
      (() => {
        Module(() => {
          // junk
        }, () => {
          // junk
        }, {})
      }).should.throw('missing or wrong clusterSize');
    });

    it('should throw an error if options.clusterSize is not a number 1', function () {
      (() => {
        Module(() => {
          // junk
        }, () => {
          // junk
        }, {
          clusterSize: 'string'
        })
      }).should.throw('missing or wrong clusterSize');
    });

    it('should throw an error if options.clusterSize is not a number 2', function () {
      (() => {
        Module(() => {
          // junk
        }, () => {
          // junk
        }, {
          clusterSize: false
        })
      }).should.throw('missing or wrong clusterSize');
    });

    it('should throw an error if options.port is missing', function () {
      (() => {
        Module(() => {
          // junk
        }, () => {
          // junk
        }, {
          clusterSize: 2
        })
      }).should.throw('missing port');
    });

    it('should not throw an error if all mandatory options are ok', function (done) {
      const module = Module(() => {
        // junk
      }, () => {
        module.close();
        done();
      } ,{
        clusterSize: 2,
        port: 9999
      })
    });

  });

});
