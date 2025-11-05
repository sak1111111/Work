# Базовые запросы
curl -X GET http://localhost:3000/
curl -X GET http://localhost:3000/api/users
curl -X GET http://localhost:3000/api/products

# Пользователи
curl -X GET "http://localhost:3000/api/users?page=1&limit=2"
curl -X GET "http://localhost:3000/api/users?search=иван"
curl -X GET http://localhost:3000/api/users/1
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Новый Пользователь","email":"new@example.com","age":28}'
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Обновленное Имя","email":"updated@example.com","age":30}'
curl -X PATCH http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"age":31}'
curl -X DELETE http://localhost:3000/api/users/2
curl -X GET http://localhost:3000/api/users/1/orders

# Товары
curl -X GET "http://localhost:3000/api/products?category=laptops"
curl -X GET "http://localhost:3000/api/products?inStock=true&minPrice=50000"
curl -X GET "http://localhost:3000/api/products?sortBy=price&order=desc"
curl -X GET http://localhost:3000/api/products/categories
curl -X GET http://localhost:3000/api/products/1
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Новый Товар","price":15000,"category":"electronics","inStock":true}'
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Обновленный Товар","price":20000,"category":"electronics","inStock":false}'
curl -X PATCH http://localhost:3000/api/products/1/stock \
  -H "Content-Type: application/json" \
  -d '{"inStock":true}'
curl -X DELETE http://localhost:3000/api/products/3

# Ошибки
curl -X GET http://localhost:3000/api/users/999
curl -X GET http://localhost:3000/api/nonexistent
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Only Name"}'