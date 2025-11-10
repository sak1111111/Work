@"
<!DOCTYPE html>
<html>
<head>
    <title>Greeting Page</title>
</head>
<body>
    <h1>Hello, {{ `$name }}!</h1>
    <p>Welcome to Laravel!</p>
    <a href="/">Back to Home</a>
</body>
</html>
"@ | Out-File -FilePath "resources\views\greeting.blade.php" -Encoding UTF8

# Создаем resources/views/welcome.blade.php
@"
<!DOCTYPE html>
<html>
<head>
    <title>Laravel App</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        ul { list-style-type: none; padding: 0; }
        li { margin: 10px 0; }
        a { text-decoration: none; color: blue; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <h1>Welcome to Laravel!</h1>
    <p>This is a manually created Laravel structure for educational purposes.</p>
    <h2>Available Routes:</h2>
    <ul>
        <li><a href="/hello">/hello route</a> - Simple text response</li>
        <li><a href="/greeting">/greeting route</a> - Blade template with data</li>
    </ul>
</body>
</html>
"@ | Out-File -FilePath "resources\views\welcome.blade.php" -Encoding UTF8