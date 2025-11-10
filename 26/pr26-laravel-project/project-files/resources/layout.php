@"
<!DOCTYPE html>
<html lang=\"en\">
<head>
    <meta charset=\"UTF-8\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
    <title>@yield('title', 'Laravel App')</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: #2c3e50;
            color: white;
            padding: 1rem 0;
            margin-bottom: 2rem;
        }
        .nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .nav-links a {
            color: white;
            text-decoration: none;
            margin-left: 20px;
            padding: 5px 10px;
            border-radius: 3px;
            transition: background-color 0.3s;
        }
        .nav-links a:hover {
            background-color: #34495e;
        }
        .content {
            background: white;
            padding: 2rem;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .footer {
            text-align: center;
            margin-top: 2rem;
            padding: 1rem 0;
            color: #7f8c8d;
        }
    </style>
</head>
<body>
    <header class=\"header\">
        <div class=\"container\">
            <div class=\"nav\">
                <h1>Laravel Learning Project</h1>
                <div class=\"nav-links\">
                    <a href=\"/\">Home</a>
                    <a href=\"/hello\">Hello</a>
                    <a href=\"/greeting\">Greeting</a>
                </div>
            </div>
        </div>
    </header>
    
    <div class=\"container\">
        <main class=\"content\">
            @yield('content')
        </main>
    </div>
    
    <footer class=\"footer\">
        <div class=\"container\">
            <p>&copy; 2024 Laravel Learning Project. Practical Work #26.</p>
        </div>
    </footer>
</body>
</html>
"@ | Out-File -FilePath "resources\views\layout.blade.php" -Encoding UTF8