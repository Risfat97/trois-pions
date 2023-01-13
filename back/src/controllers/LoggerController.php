<?php
namespace App\src\controllers;

use App\src\models\LoggerRepository;

class LoggerController extends Controller
{
    public function __construct(LoggerRepository $loggerRepo)
    {
        parent::__construct($loggerRepo);
    }

    public function log(): array
    {
        $userAgent = $_SERVER["HTTP_USER_AGENT"];
        $remoteAddr = $this->getRealIPAddr();
        $this->repository->insertOrUpdate(['user_agent' => $userAgent, 'ip' => $remoteAddr]);
        return $this->response();
    }
}