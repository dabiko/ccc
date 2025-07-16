<?php
declare(strict_types=1);

require_once __DIR__ . '/../vendor/autoload.php'; // Load Composer packages

use Dotenv\Dotenv;

final class DBConfig
{
    public readonly string $dsn;
    public readonly string $user;
    public readonly string $password;

    public function __construct()
    {
        // Load .env variables
        $dotenv = Dotenv::createImmutable(__DIR__ . '/../');
        $dotenv->load();

        echo $host     = $_ENV['DB_HOST'] ?? 'localhost';
        $port     = $_ENV['DB_PORT'] ?? '3306';
        $dbname   = $_ENV['DB_NAME'] ?? 'ccc-web';
        $this->user     = $_ENV['DB_USER'] ?? 'root';
        $this->password = $_ENV['DB_PASSWORD'] ?? '';

        $this->dsn = "mysql:host={$host};port={$port};dbname={$dbname};charset=utf8mb4";
    }
}

final class Database
{
    private static ?PDO $connection = null;

    public static function connect(): PDO
    {
        if (self::$connection !== null) {
            return self::$connection;
        }

        $config = new DBConfig();

        try {
            self::$connection = new PDO($config->dsn, $config->user, $config->password, [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
                PDO::ATTR_EMULATE_PREPARES   => false,
                PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci'
            ]);

            error_log("✅ Database connection successful.");
            return self::$connection;

        } catch (PDOException $e) {
            error_log("❌ PDO Error: " . $e->getMessage());
            http_response_code(500);
            exit("An internal error occurred. Please try again later.");
        }
    }
}
