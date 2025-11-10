'<?php
namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // Регистрация сервисов
    }
    
    public function boot(): void
    {
        // Загрузка конфигураций
    }
}' | Out-File "project-files\app\Providers\AppServiceProvider.php" -Encoding utf8