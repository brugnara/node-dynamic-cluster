NodeJS Dynamic Cluster
======================

NodeJS Dynamic Cluster is a way to manipulate your cluster size via a simple API, provided
by this module. You will be able to resize the cluster with a simple `curl localhost:8080/scale/X`
instead of relaunch your application.

This module uses the native [cluster module](https://nodejs.org/api/cluster.html), with just some pepper.

It is dependant on KoaJS for the API part, a next release will uses only native modules. 

Any help will be appreciated.

## Howto

Check `example` folder for a quick example.
