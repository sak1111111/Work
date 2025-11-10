@"
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Пример заполнения базы данных
        // User::factory(10)->create();
    }
}
"@ | Out-File -FilePath "database\seeders\DatabaseSeeder.php" -Encoding UTF8