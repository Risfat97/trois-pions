<?php

namespace App\src\services;

use PDO;

class DatabaseService
{
	private $db;
	private static $instance = null;

	private function __construct()
	{
		try {
			$this->db = new PDO(
				sprintf('mysql:dbname=%s;host=%s', getenv('DB_DATABASE'), getenv('DB_HOST')),
				getenv('DB_USERNAME'),
				getenv('DB_PASSWORD'),
				array(
					PDO::ATTR_TIMEOUT => 3, // in seconds
					PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
					PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8mb4'
				)
			);
		} catch (\Exception $e) {
			var_dump($e->getMessage());
			throw $e;
		}
	}

	public static function getInstance()
	{
		if (is_null(self::$instance)) {
			self::$instance = new static();
		}
		return self::$instance;
	}

	public function beginTransaction()
	{
		$this->db->beginTransaction();
	}

	public function endTransaction()
	{
		$this->db->commit();
	}

	public function rollback()
	{
		$this->db->rollBack();
	}

	public function query($sql, $params = []): mixed
	{
		$res = [];
		$req = $this->db->prepare($sql);
		if ($req !== false) {
			$req->execute($params);
			// $_SESSION["lastID"] = $this->db->lastInsertId();
			if (preg_match("/^SELECT/i", $sql))
				$res = $req->fetchAll(PDO::FETCH_OBJ);
			else
				$res = $req->fetch();
		}
		return $res;
	}
}