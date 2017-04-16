/**
 * Created by brugnara on 16/04/2017,
 * @ daniele@brugnara.me
 */

'use strict';

// test requirements
const should = require('should');
const request = require('superagent');

// utils
const debug = require('debug')('test:node-dynamic-cluster:init');

// module to test
const Module = require('../');

describe('# api', function () {

  let module;
  const maxSize = 6;

  beforeEach(function (done) {
    module = Module(function () {
    }, done, {
      maxSize,
      port: 9999,
      clusterSize: 1
    })
  });

  afterEach(function () {
    module.close();
  });

  describe('scale', function () {

    it('should return the current clusterSize', function (done) {
      request
        .get('http://localhost:9999/scale')
        .end((err, res) => {
          (err === null).should.be.true();
          res.body.should.have.properties({
            status: 'ok',
            data: 1
          });
          done()
        });
    });

    it.skip('should change the current clusterSize to 2', function (done) {
      request
        .get('http://localhost:9999/scale/2')
        .end((err, res) => {
          (err === null).should.be.true();
          res.body.should.have.properties({
            status: 'ok',
            data: 2
          });
          done()
        });
    });

    it.skip('should not change the current clusterSize to 0', function (done) {
      request
        .get('http://localhost:9999/scale/0')
        .end((err, res) => {
          (err === null).should.be.true();
          res.body.should.have.properties({
            status: 'ok',
            data: 1
          });
          done()
        });
    });

    it('should not change the current clusterSize to something greater than the maxSize', function (done) {
      request
        .get('http://localhost:9999/scale/200')
        .end((err, res) => {
          (err === null).should.be.true();
          res.body.should.have.properties({
            status: 'ko',
            error: 'wanted size (200) exceeds the maxSize (6)'
          });
          done()
        });
    });

  });

});
