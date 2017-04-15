/**
 * Created by brugnara on 15/04/2017,
 * @ daniele@brugnara.me
 */

'use strict';

const Debug = require('debug');
const http = require('http');
const cluster = require('../');

cluster(function(id) {

  const debug = Debug('node-dynamic-cluster:test:' + id);

  http.createServer((req, res) => {
    debug(`Ops.. Someone poked me..`);
    res.end(`I'm ok, thanks. This is worker #${id} speaking`);
  }).listen(8080, '0.0.0.0', () => {
    debug(`listening on 8080`);
  });
});
