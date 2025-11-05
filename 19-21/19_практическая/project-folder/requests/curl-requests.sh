# Базовый сервер (порт 3000)

# Получить всех пользователей
curl -X GET http://localhost:3000/users

# Получить пользователя по ID
curl -X GET http://localhost:3000/users/1

# Создать нового пользователя
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Анна","age":28}'

# Получить все товары
curl -X GET http://localhost:3000/products

# Поиск
curl -X GET "http://localhost:3000/search?query=ноут"

# Продвинутый сервер (порт 3001)

# Получить статус
curl -X GET http://localhost:3001/api/status

# Обновить пользователя
curl -X PUT http://localhost:3001/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Новое Имя","age":26}'

# Удалить пользователя
curl -X DELETE http://localhost:3001/api/users/2