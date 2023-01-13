<?php
session_start();
use App\src\services\DatabaseService;

require_once __DIR__ . '/../vendor/autoload.php';
date_default_timezone_set('Europe/Paris');
setlocale(LC_TIME, "fr_FR");

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Content-Type: application/json');
/*
$debug = 1;

if (!isset($_SESSION)) {
    $session_time = 86400;
    ini_set('session.gc_maxlifetime', $session_time);
    ini_set('default_charset', 'utf-8');
    ini_set('display_errors', $debug);
    ini_set('display_startup_errors', $debug);
    ini_set('log_errors', $debug);
    ini_set('log_errors_max_len	"1024"	', $debug);
    ini_set('track_errors', $debug);
    ini_set('html_errors	', $debug);
    ini_set('xmlrpc_errors	', $debug);
    ini_set('xmlrpc_error_number', $debug);
    if ($debug)
        error_reporting(E_ALL);
    @session_set_cookie_params($session_time);
    @session_start();
}
*/
$dbInstance = DatabaseService::getInstance();
?>