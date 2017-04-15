```
DEBUG=* node example/index.js
```


## check main web server is working
```
curl localhost:8080
> I'm ok, thanks. This is worker #1 speaking%
curl localhost:8080
> I'm ok, thanks. This is worker #2 speaking%
curl localhost:8080
> I'm ok, thanks. This is worker #3 speaking%
curl localhost:8080
> I'm ok, thanks. This is worker #4 speaking%
```

## show current cluster size
```
curl localhost:8081/scale
> {"status":"ok","data":4}% 
```

## change cluster size
```
curl localhost:8081/scale/10
> {"status":"ok","data":10}%
```

#### check current count
```
curl localhost:8081/scale
> {"status":"ok","data":10}% 
```

#### check responding workers
```
curl localhost:8080
> I'm ok, thanks. This is worker #1 speaking%
curl localhost:8080
> I'm ok, thanks. This is worker #2 speaking%
...
curl localhost:8080
> I'm ok, thanks. This is worker #9 speaking%
curl localhost:8080
> I'm ok, thanks. This is worker #10 speaking%
```

## downsize
```
curl localhost:8081/scale/1
> {"status":"ok","data":1}%
```

### check 
```
curl localhost:8080
> I'm ok, thanks. This is worker #1 speaking%
curl localhost:8080
> I'm ok, thanks. This is worker #1 speaking%
```
