<?php
require_once 'core.php';

use App\src\controllers\LinkController;
use App\src\models\LinkRepository;
use App\src\models\LoggerRepository;

$linkCtrl = new LinkController(new LinkRepository($dbInstance), new LoggerRepository($dbInstance));
$data = $linkCtrl->create();
echo json_encode($data);