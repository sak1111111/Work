'# Практическая работа №26: Анализ PHP и знакомство с Laravel

## Выявленные проблемы в legacy-коде:
1. Смешение логики и представления
2. SQL-инъекции
3. Отсутствие валидации данных

## Инструкция по запуску:
1. php -S localhost:8000 -t project-files/public
2. Открыть http://localhost:8000

## Созданные маршруты:
- GET / - главная страница
- GET /hello - текст "Hello World"
- GET /greeting - Blade шаблон с данными' | Out-File "docs\README.md" -Encoding utf8