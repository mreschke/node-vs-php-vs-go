var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;
// var redis = require('redis');
// var client = redis.createClient();

if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
// } else {
// 	http.createServer(function(request, response) {
//     client.hgetall('perftest', function(err, results) {
//   		response.writeHead(200, { 'Content-Type': 'application/json'});
//   		response.write(JSON.stringify(results));
//   		response.end();
//   	});
// 	}).listen(3001, function() {
// 		console.log('listener spun up on localhost:3001')
// 	});
// }

// other way, creating a client per forked thread
} else {
  var redis = require('redis');
  var client = redis.createClient();
	http.createServer(function(request, response) {
    client.hgetall('keystone:dynatron/metric::ebis-wlri-analysis:info', function(err, results) {
  		response.writeHead(200, { 'Content-Type': 'application/json'});
  		response.write(JSON.stringify(results));
  		response.end();
  	});
	}).listen(3000, function() {
		console.log('listener spun up on localhost:3000')
	});
}
