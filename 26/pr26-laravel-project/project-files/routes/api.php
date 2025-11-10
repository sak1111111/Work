@"
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request \$request) {
    return \$request->user();
})->middleware('auth:api');

Route::get('/test', function () {
    return response()->json(['message' => 'API is working!']);
});
"@ | Out-File -FilePath "routes\api.php" -Encoding UTF8