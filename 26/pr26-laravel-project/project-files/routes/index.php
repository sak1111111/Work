@"
<?php
// Laravel entry point
require __DIR__.'/../vendor/autoload.php';
`$app = require_once __DIR__.'/../bootstrap/app.php';
?>
"@ | Out-File -FilePath "public\index.php" -Encoding UTF8