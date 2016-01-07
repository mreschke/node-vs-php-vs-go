<?php

require './vendor/predis/predis/src/Autoloader.php';

Predis\Autoloader::register();

#$client = new Predis\Client([
#	'schema' => 'tcp',
#	'host' => 'localhost',
#	'port' => 6379
#]);

$client = new Predis\Client('tcp://localhost:6379');
$results = $client->hgetall('keystone:dynatron/metric::ebis-wlri-analysis:info');

header('Content-Type: application/json');
echo json_encode($results);

#echo "hi";
