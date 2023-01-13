<?php
namespace App\src\services;

class SessionService {

    public static function key_exists(string $key): bool {
        return isset($_SESSION[$key]);
    }

    public static function get(string $key): mixed {
        if(self::key_exists($key)){
            return $_SESSION[$key];
        }
        return null;
    }

    public static function set(string $key, mixed $value) {
        $_SESSION[$key] = $value;
    }

    public static function unset(string $key) {
        if(self::key_exists($key)){
            unset($_SESSION[$key]);
        }
    }

    public static function destroy() {
        session_destroy();
    }
}
?>