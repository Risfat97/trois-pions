<?php
require_once 'core.php';

use App\src\controllers\LoggerController;
use App\src\models\LoggerRepository;

$loggerCtrl = new LoggerController(new LoggerRepository($dbInstance));
$data = $loggerCtrl->log();
echo json_encode($data);