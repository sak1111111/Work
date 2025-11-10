Rename-Item "project-files\config\bd.config.php" "project-files\config\database.php"
'<?php
return [
    "default" => "mysql",
    "connections" => [
        "mysql" => [
            "driver" => "mysql",
            "host" => "127.0.0.1",
            "port" => "3306",
            "database" => "laravel_app",
            "username" => "root",
            "password" => "",
            "charset" => "utf8mb4",
            "collation" => "utf8mb4_unicode_ci"
        ]
    ]
];' | Out-File "project-files\config\database.php" -Encoding utf8