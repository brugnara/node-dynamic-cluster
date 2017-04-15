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
const CLUSTER_SIZE = +(process.env.CLUSTER_SIZE || require('os').cpus().length);
const CLUSTER_PORT = +(process.env.CLUSTER_PORT || (process.env.PORT + 1) || 8081);
const CLUSTER_MAX_SIZE = +(process.env.CLUSTER_MAX_SIZE || MAX_SIZE);

module.exports = function (workerStart, masterCallback, options) {

  if (!workerStart) {
    throw new Error('missing `workerStart` function');
  }

  if (CLUSTER_MAX_SIZE > MAX_SIZE) {
    debug(`WARN!! current clusterMaxSize (${CLUSTER_MAX_SIZE}) is grater than the maxSize (${MAX_SIZE}). This may not be what you want.`);
  }

  if (cluster.isMaster) {
    debug(`master is running with pid ${process.pid}`);

    // starting HTTP Api server

    debug(`starting HTTP server for remote control, on port ${CLUSTER_PORT}`);
    const api = Api({
      port: CLUSTER_PORT,
      size: CLUSTER_SIZE,
      maxSize : CLUSTER_MAX_SIZE
    });

    return api.listen(() => {
      masterCallback && masterCallback();
    });
  }

  // worker code

  debug(`this is worker ${cluster.worker.id}, running with pid ${process.pid}`);
  workerStart(cluster.worker.id);

};
