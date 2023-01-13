<?php

namespace App\src\models;

use App\src\services\DatabaseService;

class LoggerRepository extends Repository
{
    public function __construct(DatabaseService $dbService)
    {
        parent::__construct($dbService, 'visitors');
    }

    public function insertOrUpdate($visitor) {
        $res = $this->dbInstance->query("select * from {$this->table} where ip LIKE :ip", ['ip' => $visitor['ip']]);
        if(empty($res)) {
            parent::insert($visitor);
        } else {
            $this->dbInstance->query("update {$this->table} set count = count+1, last_visit = CURRENT_TIMESTAMP() where id LIKE :id", ['id' => $res[0]->id]);
        }
    }
}