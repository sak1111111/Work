@"
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
        //
    }
    
    public function boot()
    {
        //
    }
}
"@ | Out-File -FilePath "app\Providers\AppServiceProvider.php" -Encoding UTF8