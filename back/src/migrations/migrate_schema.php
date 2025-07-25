<?php
require_once __DIR__ . '/bootstrap.php';

if (php_sapi_name() !== 'cli') {
	exit("This script must be run from command line.\n");
}

$schemas = [];

$schemas['create_visitors_table'] = <<<SQL
	CREATE TABLE IF NOT EXISTS visitors (
		id INT AUTO_INCREMENT PRIMARY KEY,
		user_agent VARCHAR(255) NOT NULL,
		ip VARCHAR(16) NOT NULL,
		count INT NOT NULL DEFAULT 1,
		last_visit TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	)
SQL;

$schemas['create_games_table'] = <<<SQL
	CREATE TABLE IF NOT EXISTS games (
		id INT AUTO_INCREMENT PRIMARY KEY,
		creator VARCHAR(255) NOT NULL,
		link VARCHAR(255) NOT NULL,
		adversary VARCHAR(255) DEFAULT NULL
	)
SQL;

foreach ($schemas as $key => $value) {
	echo 'Running ' . $key . PHP_EOL;
	try {
		$res = $dbInstance->query($value);
		print_r($res);
	} catch(Exception $e) {
		echo $e->getMessage() . PHP_EOL;
	}
}

die;