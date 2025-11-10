@"
@extends('layout')

@section('title', 'Home Page')

@section('content')
    <h2>Welcome to Laravel!</h2>
    <p>This is a manually created Laravel structure for educational purposes.</p>
    
    <h3>About This Project</h3>
    <p>This project demonstrates:</p>
    <ul>
        <li>MVC Architecture</li>
        <li>Routing in Laravel</li>
        <li>Blade Templating</li>
        <li>Project Structure</li>
    </ul>
    
    <h3>Available Routes:</h3>
    <div style=\"display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 1rem;\">
        <div style=\"background: #e8f4fd; padding: 1rem; border-radius: 5px; border-left: 4px solid #3498db;\">
            <h4><a href=\"/hello\" style=\"color: #2980b9; text-decoration: none;\">/hello</a></h4>
            <p>Simple text response route</p>
        </div>
        <div style=\"background: #e8f6f3; padding: 1rem; border-radius: 5px; border-left: 4px solid #27ae60;\">
            <h4><a href=\"/greeting\" style=\"color: #27ae60; text-decoration: none;\">/greeting</a></h4>
            <p>Blade template with data passing</p>
        </div>
    </div>
@endsection
"@ | Out-File -FilePath "resources\views\welcome.blade.php" -Encoding UTF8 -Force

# Обновляем greeting.blade.php
@"
@extends('layout')

@section('title', 'Greeting Page')

@section('content')
    <div style=\"text-align: center; padding: 2rem;\">
        <h1 style=\"color: #2c3e50; margin-bottom: 1rem;\">Hello, {{ \$name }}! 👋</h1>
        <p style=\"font-size: 1.2rem; margin-bottom: 2rem;\">Welcome to our Laravel learning journey!</p>
        
        <div style=\"background: #f8f9fa; padding: 1.5rem; border-radius: 8px; display: inline-block;\">
            <h3 style=\"color: #e74c3c; margin-bottom: 1rem;\">Did You Know?</h3>
            <p>This page uses:</p>
            <ul style=\"text-align: left; display: inline-block;\">
                <li>Blade Template Inheritance</li>
                <li>Data passing from controller</li>
                <li>CSS styling</li>
                <li>Layout system</li>
            </ul>
        </div>
        
        <div style=\"margin-top: 2rem;\">
            <a href=\"/\" style=\"display: inline-block; background: #3498db; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 0 10px;\">
                ← Back to Home
            </a>
            <a href=\"/hello\" style=\"display: inline-block; background: #2ecc71; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 0 10px;\">
                Visit Hello Page →
            </a>
        </div>
    </div>
@endsection
"@ | Out-File -FilePath "resources\views\greeting.blade.php" -Encoding UTF8 -Force