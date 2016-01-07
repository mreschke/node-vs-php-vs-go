var http = require('http');
var redis = require('redis'), client = redis.createClient();
//var redis = require('ioredis'), client = new redis();

var server = http.createServer(function(request, response) {
	//response.end('hi');
	client.hgetall('keystone:dynatron/metric::ebis-wlri-analysis:info', function(err, results) {
		response.writeHead(200, { 'Content-Type': 'application/json'});
		response.write(JSON.stringify(results));
		response.end();
	});
});

server.listen(3000, function() {
	console.log("Listening on port 3000");
});
