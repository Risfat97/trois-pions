<?php
use App\src\services\DatabaseService;
use Dotenv\Dotenv;

require_once __DIR__ . '/../../vendor/autoload.php';
date_default_timezone_set('Europe/Paris');
setlocale(LC_TIME, "fr_FR");

$dotenv = Dotenv::createImmutable(__DIR__ . '/../../');
$dotenv->load();

$dbInstance = DatabaseService::getInstance();
?>