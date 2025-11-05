# Базовые запросы
curl -X GET http://localhost:3000/
curl -X GET http://localhost:3000/api/stats

# Получение книг
curl -X GET "http://localhost:3000/api/books"
curl -X GET "http://localhost:3000/api/books?page=1&limit=3"
curl -X GET "http://localhost:3000/api/books?author=достоевский"
curl -X GET "http://localhost:3000/api/books?genre=роман&available=true"
curl -X GET "http://localhost:3000/api/books?year=1866"
curl -X GET "http://localhost:3000/api/books?search=война"
curl -X GET "http://localhost:3000/api/books?sortBy=year&order=desc"
curl -X GET http://localhost:3000/api/books/1

# Создание книги
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Анна Каренина",
    "author": "Лев Толстой",
    "isbn": "978-5-389-00006-6",
    "genre": "Роман",
    "year": 1877,
    "pages": 864,
    "available": true
  }'

# Полное обновление (PUT)
curl -X PUT http://localhost:3000/api/books/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Преступление и наказание (обновленное)",
    "author": "Федор Достоевский",
    "isbn": "978-5-389-00001-1",
    "genre": "Классический роман",
    "year": 1866,
    "pages": 612,
    "available": false
  }'

# Частичное обновление (PATCH)
curl -X PATCH http://localhost:3000/api/books/1 \
  -H "Content-Type: application/json" \
  -d '{
    "available": true,
    "pages": 620
  }'

# Удаление книги
curl -X DELETE http://localhost:3000/api/books/3

# Тестирование ошибок
curl -X GET http://localhost:3000/api/books/999
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{"title": "Только название"}'
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Дубликат",
    "author": "Автор",
    "isbn": "978-5-389-00001-1"
  }'