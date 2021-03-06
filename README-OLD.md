# Node.js vs Nginx-PHP7-FPM vs Go

**NOTICE:  These results are not accurate while using multi-core at the moment, simply
because node.js will utilize only one while nginx and go will utilize all.  I will update
results while testing within equally constrained containers shortly**

### The Setup
A basic speed test between Node.js, Nginx-PHP7-FPM and golang

PHP7, with nginx at 4 workers will utilize all cores
Node.js as I started it, is NOT multi-core, yet...
Go v1.5.2 will utilize all cores

My test VM is an in-house (OpenNebula) Debian Jessie KVM virtual machine with 4GB ram and 4-core...the physical machine
it sits on is a Dell R710, with dual 6-core hyperthreaded Xeons...its a good fast VM.

Notice its plan old PHP7-FPM, Opcache is of course enabled as default.  No Laravel/Lumen/Symfony framework.
I don't even use the composer autoloader, but predis autoloader.

PHP7-FPM used via unix sockets from nginx.  Nginx is mostly default at 4 worker_processes.
**This will mean nginx will use multiple cores..while this node.js test will not.**

All 3 scripts provide a simple HTTP endpoint that gets data from redis.  The redis key is a simple
hash of a few paragraphs worth of text.  Nothing too big.

All `ab` HTTP requests to node, go and nginx sockets are localhost, no external TCP/IP, no loadbalancers in the way, all 127.0.0.1
Redis was setup to use TCP/IP sockets as usual, not UNIX sockets.

Using apache bench with -n for number of connections and -c for concurrency


### The Results

Node.js is short here because it will not utilize all cores in this test.


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

Node faster for single hits, but as concurrency grew, PHP/nginx became faster (becuase nginx will utilize
multiple cores while node will not in this test.  Go at v1.5 will utilize multi-core.
