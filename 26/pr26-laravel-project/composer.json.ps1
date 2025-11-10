'{
    "name": "student/laravel-app",
    "type": "project",
    "description": "Laravel Learning Project for Practical Work #26",
    "require": {
        "php": "^8.0",
        "laravel/framework": "^10.0"
    },
    "autoload": {
        "psr-4": {
            "App\\": "project-files/app/"
        }
    }
}' | Out-File "composer.json" -Encoding utf8