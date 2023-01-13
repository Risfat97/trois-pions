<?php

namespace App\src\models;

use App\src\services\DatabaseService;

class LinkRepository extends Repository
{
    public function __construct(DatabaseService $dbService)
    {
        parent::__construct($dbService, 'games');
    }

    public function findLinkNotUsed(string $creator) {
        $res = $this->dbInstance->query("select link from {$this->table} where creator LIKE :creator and adversary IS NULL", ['creator' => $creator]);
        if(empty($res))
            return '';
        return $res[0]->link;
    }

    public function join($params) {
        $res = $this->dbInstance->query("update {$this->table} set adversary = :adversary where link LIKE :link and adversary IS NULL", $params);
        return $res;
    }
}