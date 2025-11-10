Rename-Item "project-files\database\seeders\seeders.php" "project-files\database\seeders\DatabaseSeeder.php"
'<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Создание тестовых пользователей
        User::create([
            "name" => "Admin User",
            "email" => "admin@example.com",
            "password" => bcrypt("password")
        ]);
    }
}' | Out-File "project-files\database\seeders\DatabaseSeeder.php" -Encoding utf8