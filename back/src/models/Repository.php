<?php
namespace App\src\models;

use App\src\services\DatabaseService;

abstract class Repository
{
    protected $table;
    protected $dbInstance;

    protected function __construct(DatabaseService $dbService, string $tablename='')
    {
        $this->table = $tablename;
        $this->dbInstance = $dbService;
    }

    public function insert(array $line)
    {
        $paramsQuery = '';
        foreach($line as $key => $value) {
            $paramsQuery .= ":$key,"; 
        }
        $paramsQuery = substr($paramsQuery, 0, -1);
        $paramsQuery = '(' . $paramsQuery . ')';

        $query = "INSERT INTO " . $this->table . '(' . implode(', ', array_keys($line)) . ')' . ' VALUES ' . $paramsQuery;
        $lastId = -1;
        try {
            $this->dbInstance->query($query, $line);
            // $lastId = $_SESSION["lastID"];
        } catch (\Exception $e) {
            throw new \Exception($e);
        }
        return $lastId;
    }

    public function find(int $id) {
        $res = $this->dbInstance->query("select * from {$this->table} where id = :id", ['id' => $id]);
        return $res[0] ?? null;
    }

    public function findBy(string $key, string $value) {
        $res = $this->dbInstance->query("select * from {$this->table} where {$key} LIKE :{$key}", [$key => $value]);
        return $res[0] ?? null;
    }
}