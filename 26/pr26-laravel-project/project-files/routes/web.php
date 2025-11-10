'<?php
use Illuminate\Support\Facades\Route;

// Главная страница
Route::get("/", function () {
    return view("welcome");
});

// Простой маршрут с текстом
Route::get("/hello", function () {
    return "Hello World! This is a simple Laravel route.";
});

// Маршрут с Blade шаблоном и передачей данных
Route::get("/greeting", function () {
    return view("greeting", [
        "name" => "Student"
    ]);
});

// Дополнительный маршрут для демонстрации
Route::get("/about", function () {
    return response()->json([
        "message" => "This is Laravel API response",
        "version" => "1.0",
        "author" => "Student"
    ]);
});' | Out-File "project-files\routes\web.php" -Encoding utf8