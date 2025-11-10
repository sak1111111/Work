'<?php
use Illuminate\Support\Facades\Route;

Route::get("/", function () {
    return "Laravel App - Home Page";
});' | Out-File "project-files\laravel-app\routes\web.php" -Encoding utf8