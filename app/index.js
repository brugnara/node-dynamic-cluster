/**
 * Created by brugnara on 15/04/2017,
 * @ daniele@brugnara.me
 */

'use strict';

const Debug = require('debug');
const debug = Debug('node-dynamic-cluster:index');
debug.verbose = Debug('verbose:node-dynamic-cluster:index');

const cluster = require('cluster');
const http = require('http');
const Api = require('api');

const MAX_SIZE = 64;

module.exports = function (workerStart, masterCallback, options) {

  if (!workerStart) {
    throw new Error('missing `workerStart` function');
  }

  if (!options) {
    options = masterCallback;
  }
  masterCallback = null;

  if (options.maxSize > MAX_SIZE) {
    debug(`WARN!! current clusterMaxSize (${options.maxSize}) is grater than the maxSize (${MAX_SIZE}). This may not be what you want.`);
  }

  if (cluster.isMaster) {
    debug(`master is running with pid ${process.pid}`);

    // starting HTTP Api server

    debug(`starting HTTP server for remote control, on port ${options.port}`);
    const api = Api(options);

    return api.listen(() => {
      masterCallback && masterCallback();
    });
  }

  // worker code

  debug(`this is worker id ${cluster.worker.id}, running with pid ${process.pid}`);
  workerStart(cluster.worker.id);

};
