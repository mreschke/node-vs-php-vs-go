# Node.js vs Nginx-PHP7-FPM vs Go


### The Setup
A basic speed test between Node.js, Nginx-PHP7-FPM and golang

My test VM is an in-house (OpenNebula) Debian Jessie KVM virtual machine with 4GB ram and 4-core...the physical machine
it sits on is a Dell R710, with dual 6-core hyperthreaded Xeons...its a good fast VM.

Notice its plan old PHP7-FPM, Opcache is of course enabled as default.  No Laravel/Lumen/Symfony framework.
I don't even use the composer autoloader, but predis autoloader.

PHP7-FPM used via unix sockets from nginx.  Nginx is mostly default at 4 worker_processes.

All 3 scripts provide a simple HTTP endpoint that gets data from redis.  The redis key is a simple
hash of a few paragraphs worth of text.  Nothing too big.

All `ab` HTTP requests to node, go and nginx sockets are localhost, no external TCP/IP, no loadbalancers in the way, all 127.0.0.1
Redis was setup to use TCP/IP sockets as usual, not UNIX sockets.

Using apache bench with -n for number of connections and -c for concurrency


### The Results
```
test			node.js					php7				go
--------------------------------------------------------------
ab -n10 -c1		1173 r/s, 0.8 ms/r		560 r/s, 1.7 ms/r	797 r/s, 1.2 ms/r
ab -n100 -c1	1200 r/s, 0.8 ms/r		622 r/s, 1.6 ms/r	795 r/s, 1.2 ms/r
ab -n100 -c10   1749 r/s, 5.75 ms/r		1900 r/s, 5.1 ms/r	3100 r/s, 3.2 ms/r
ab -n1000 -c20	2100 r/s, 9.4 ms/r		2200 r/s, 9.0 ms/r	4000 r/s, 4.9 ms/r
ab -n5000 -c200 2300 r/s, 86.4 ms/r		5400 r/s, 37 ms/r	5000 r/s, 49.6 ms/r
```

`r/s` = requests per second

`ms/r` = mean milliseconds per request

Node faster for single hits, but as concurrency grew, PHP/nginx became faster.  PHP was even faster
than GO at handling large concurrency...which is a testament to nginx I am sure.

Oddly enough, the node.js test with the ioredis library was slower than with the regular redis library.
