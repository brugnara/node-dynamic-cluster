NodeJS Dynamic Cluster
======================

NodeJS Dynamic Cluster is a way to manipulate your cluster size via a simple API, provided
by this module. You will be able to resize the cluster with a simple `curl localhost:8080/scale/X`
instead of relaunch your application.

This module uses the native [cluster module](https://nodejs.org/api/cluster.html), with just some pepper.

It is dependant on `Debug` only. 

Please use the last version as the first (1.0.x and 1.1.x) use KoaJS.

Any help or hint will be appreciated.

## Howto

Check `example` folder for a quick example.

## Options

```js
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



