const express = require('express');
const router = express.Router();

// Временное хранилище данных (в реальном приложении используйте БД)
let users = [
    { id: 1, name: 'Иван Иванов', email: 'ivan@example.com', age: 25 },
    { id: 2, name: 'Мария Петрова', email: 'maria@example.com', age: 30 },
    { id: 3, name: 'Петр Сидоров', email: 'petr@example.com', age: 35 }
];

// Middleware для поиска пользователя по ID
router.param('userId', (req, res, next, id) => {
    const userId = parseInt(id);
    const user = users.find(u => u.id === userId);
    
    if (!user) {
        return res.status(404).json({
            error: 'Пользователь не найден',
            userId: id
        });
    }
    
    req.user = user;
    req.userId = userId;
    next();
});

// GET /api/users - Получить всех пользователей
router.get('/', (req, res) => {
    const { page = 1, limit = 10, search } = req.query;
    
    let filteredUsers = [...users];
    
    // Поиск по имени или email
    if (search) {
        filteredUsers = filteredUsers.filter(user => 
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
        );
    }
    
    // Пагинация
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
    
    res.json({
        users: paginatedUsers,
        pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total: filteredUsers.length,
            totalPages: Math.ceil(filteredUsers.length / limit)
        },
        search: search || null
    });
});

// GET /api/users/:userId - Получить пользователя по ID
router.get('/:userId', (req, res) => {
    res.json({
        user: req.user
    });
});

// POST /api/users - Создать нового пользователя
router.post('/', (req, res) => {
    const { name, email, age } = req.body;
    
    // Валидация
    if (!name || !email) {
        return res.status(400).json({
            error: 'Имя и email обязательны для заполнения'
        });
    }
    
    // Проверка уникальности email
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(409).json({
            error: 'Пользователь с таким email уже существует'
        });
    }
    
    const newUser = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        name,
        email,
        age: age || null
    };
    
    users.push(newUser);
    
    res.status(201).json({
        message: 'Пользователь успешно создан',
        user: newUser
    });
});

// PUT /api/users/:userId - Полное обновление пользователя
router.put('/:userId', (req, res) => {
    const { name, email, age } = req.body;
    
    if (!name || !email) {
        return res.status(400).json({
            error: 'Имя и email обязательны для заполнения'
        });
    }
    
    // Проверка уникальности email (исключая текущего пользователя)
    const emailExists = users.find(u => u.email === email && u.id !== req.userId);
    if (emailExists) {
        return res.status(409).json({
            error: 'Пользователь с таким email уже существует'
        });
    }
    
    const userIndex = users.findIndex(u => u.id === req.userId);
    users[userIndex] = { id: req.userId, name, email, age: age || null };
    
    res.json({
        message: 'Пользователь успешно обновлен',
        user: users[userIndex]
    });
});

// PATCH /api/users/:userId - Частичное обновление пользователя
router.patch('/:userId', (req, res) => {
    const { name, email, age } = req.body;
    const userIndex = users.findIndex(u => u.id === req.userId);
    
    // Проверка уникальности email если он обновляется
    if (email && email !== users[userIndex].email) {
        const emailExists = users.find(u => u.email === email && u.id !== req.userId);
        if (emailExists) {
            return res.status(409).json({
                error: 'Пользователь с таким email уже существует'
            });
        }
    }
    
    // Обновляем только переданные поля
    users[userIndex] = {
        ...users[userIndex],
        ...(name && { name }),
        ...(email && { email }),
        ...(age !== undefined && { age })
    };
    
    res.json({
        message: 'Пользователь успешно обновлен',
        user: users[userIndex]
    });
});

// DELETE /api/users/:userId - Удалить пользователя
router.delete('/:userId', (req, res) => {
    const userIndex = users.findIndex(u => u.id === req.userId);
    const deletedUser = users.splice(userIndex, 1)[0];
    
    res.json({
        message: 'Пользователь успешно удален',
        user: deletedUser
    });
});

// GET /api/users/:userId/orders - Получить заказы пользователя (пример вложенного роута)
router.get('/:userId/orders', (req, res) => {
    res.json({
        message: `Заказы пользователя ${req.user.name}`,
        userId: req.userId,
        orders: [
            { id: 1, product: 'Ноутбук', price: 50000 },
            { id: 2, product: 'Телефон', price: 25000 }
        ]
    });
});

module.exports = router;