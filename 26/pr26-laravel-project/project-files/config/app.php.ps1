Rename-Item "project-files\config\confing.php" "project-files\config\app.php"
'<?php
return [
    "name" => "Laravel Learning Project",
    "env" => "local",
    "debug" => true,
    "url" => "http://localhost:8000",
    "timezone" => "UTC",
    "locale" => "en"
];' | Out-File "project-files\config\app.php" -Encoding utf8