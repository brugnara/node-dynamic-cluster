NodeJS Dynamic Cluster
======================

NodeJS Dynamic Cluster is a way to manipulate your cluster size via a simple API, provided
by this module. You will be able to resize the cluster with a simple `curl localhost:8080/scale/X`
instead of relaunch your application.

This module uses the native [cluster module](https://nodejs.org/api/cluster.html), with just some pepper.

It is dependant on `Debug` only. 

Please use the last version as the first (1.0.x and 1.1.x) use KoaJS.

Any help or hint will be appreciated.

## NodeJS

Developed for the current LTS, `6.10.2`.

## API

This module exposes some API via HTTP to control the cluster.

#### /scale

Gives you the current size

```bash
curl localhost:8080/scale
> {"status":"ok","data":4}
```

#### /scale/:size

Scale the cluster to wanted `:size`, only if the new size is `>0` and not equal to current size.

```bash
curl localhost:8080/scale/10
> {"status":"ok","data":10}

curl localhost:8080/scale/0
> {"status":"ok","data":10} # current size is returned

curl localhost:8080/scale/-20
> {"status":"ok","data":10} # current size is returned
```

#### /check

Returns info about the cluster' health. The health is **OK** if the current workers count equals the 
wanted cluster size.

```bash
curl localhost:8080/check
> {"status":"ok"}
```

## Howto

Check `example` folder for a quick example.

```js
const cluster = require('node-dynamic-cluster');

cluster(workerStart, [masterCallback], options);
```

### workerStart

The function where your app code starts. A param with the worker id is passed to this callback
by the main API.

```js
function workerStart(id) {
  const debug = Debug('node-dynamic-cluster:test:' + id);

  http.createServer((req, res) => {
    debug(`Ops.. Someone poked me..`);
    res.end(`I'm ok, thanks. This is worker #${id} speaking`);
  }).listen(8080, '0.0.0.0', () => {
    debug(`listening on 8080`);
  });
}
```

### masterCallback
> not mandatory

Called after the `listen()` on the master is ready.

### options

```
{
  clusterSize: 4,
  port: 8080,
  maxSize: 64,
  host: '0.0.0.0'
}
```

#### clusterSize
> mandatory

How many workers to span up on boot. Defaulting to the number of CPU is a good choice.

```js
const clusterSize = require('os').cpus().length
```

#### port
> mandatory

The port the API will listen to.

#### maxSize

This avoid to destroy your server spanning 10 thousand workers...
Not mandatory, defaults to `64`. A warning will appear if you pass a value greater than 64.
It is safe to ignore it, if you know what you are doing.

#### host

The host the API will listen to. Defaults to `0.0.0.0`. Useful for securing your app.

## debug

```bash
DEBUG=node-dynamic-cluster:*

# verbose
DEBUG=verbose:node-dynamic-cluster:*,node-dynamic-cluster:*.
```

## test

```bash
npm test
```
