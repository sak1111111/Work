Rename-Item "project-files\config\view.confing.php" "project-files\config\view.php"
'<?php
return [
    "paths" => [
        resource_path("views")
    ],
    "compiled" => realpath(storage_path("framework/views"))
];' | Out-File "project-files\config\view.php" -Encoding utf8