<?php
namespace App\src\controllers;

abstract class Controller
{
    protected $repository;
    protected function __construct($repository)
    {
        $this->repository = $repository;
    }

    protected function response(int $code = 200, string $msg = '', array $data = []): array
    {
        return [
            'code' => $code,
            'msg'  => $msg,
            'data' => $data,
        ];
    }

    protected function getRealIPAddr()
    {
      //check ip from share internet
      if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
      }
      //to check ip is pass from proxy
      elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
      } else {
        $ip = $_SERVER['REMOTE_ADDR'];
      }
    
      return $ip;
    }
}