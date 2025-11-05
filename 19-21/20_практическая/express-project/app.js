const express = require('express');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const logger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Базовые middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Статические файлы
app.use('/static', express.static('public'));

// Главная страница
app.get('/', (req, res) => {
    res.json({
        message: 'Добро пожаловать в Express.js приложение!',
        endpoints: {
            users: '/api/users',
            products: '/api/products',
            documentation: 'Посмотрите README для полного списка эндпоинтов'
        }
    });
});

// Подключение роутеров
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);

// Middleware для обработки 404
app.use((req, res, next) => {
    res.status(404).json({
        error: 'Маршрут не найден',
        path: req.path,
        method: req.method
    });
});

// Централизованная обработка ошибок
app.use((error, req, res, next) => {
    console.error('Ошибка сервера:', error);
    
    res.status(error.status || 500).json({
        error: error.message || 'Внутренняя ошибка сервера',
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на порту ${PORT}`);
    console.log(`📚 Документация API доступна по адресу: http://localhost:${PORT}`);
    console.log(`👥 Пользователи: http://localhost:${PORT}/api/users`);
    console.log(`🛍️  Товары: http://localhost:${PORT}/api/products`);
});

module.exports = app;