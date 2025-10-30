const express = require('express');
const User = require('../models/User');
const { authenticateToken, generateToken } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');

const router = express.Router();

// Регистрация
router.post('/register', async (req, res) => {
  try {
    const { email, password, role = 'user' } = req.body;

    // Валидация
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email и пароль обязательны' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        error: 'Пароль должен содержать минимум 6 символов' 
      });
    }

    // Проверка существующего пользователя
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ 
        error: 'Пользователь с таким email уже существует' 
      });
    }

    // Создание пользователя
    const user = await User.create({ email, password, role });
    
    // Генерация токена
    const token = generateToken(user);

    res.status(201).json({
      message: 'Пользователь успешно зарегистрирован',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    res.status(500).json({ 
      error: 'Внутренняя ошибка сервера' 
    });
  }
});

// Логин
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Валидация
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email и пароль обязательны' 
      });
    }

    // Поиск пользователя
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ 
        error: 'Неверный email или пароль' 
      });
    }

    // Проверка пароля
    const isValidPassword = await User.verifyPassword(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ 
        error: 'Неверный email или пароль' 
      });
    }

    // Генерация токена
    const token = generateToken(user);

    res.json({
      message: 'Успешный вход в систему',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Ошибка входа:', error);
    res.status(500).json({ 
      error: 'Внутренняя ошибка сервера' 
    });
  }
});

// Защищенные маршруты для тестирования

// Для всех аутентифицированных пользователей
router.get('/profile', authenticateToken, (req, res) => {
  res.json({
    message: 'Доступ к профилю разрешен',
    user: req.user
  });
});

// Только для пользователей с ролью user
router.get('/user-dashboard', authenticateToken, authorize('user'), (req, res) => {
  res.json({
    message: 'Добро пожаловать в панель пользователя',
    user: req.user
  });
});

// Только для администраторов
router.get('/admin-dashboard', authenticateToken, authorize('admin'), (req, res) => {
  res.json({
    message: 'Добро пожаловать в административную панель',
    user: req.user,
    stats: {
      totalUsers: 150,
      activeUsers: 120
    }
  });
});

// Для администраторов и модераторов
router.get('/moderator-dashboard', authenticateToken, authorize(['admin', 'moderator']), (req, res) => {
  res.json({
    message: 'Добро пожаловать в панель модератора',
    user: req.user
  });
});

module.exports = router;