const User = require('./User');
const db = require('../config/database');

// Тестовые данные для инициализации
const initializeTestData = async () => {
  try {
    // Проверяем, есть ли уже пользователи
    const userCount = await new Promise((resolve, reject) => {
      db.get("SELECT COUNT(*) as count FROM users", (err, row) => {
        if (err) reject(err);
        else resolve(row.count);
      });
    });

    if (userCount === 0) {
      console.log('Создание тестовых пользователей...');
      
      // Создаем тестового администратора
      const bcrypt = require('bcryptjs');
      const adminPasswordHash = await bcrypt.hash('admin123', 10);
      const userPasswordHash = await bcrypt.hash('user123', 10);

      await new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)`,
          ['admin@example.com', adminPasswordHash, 'admin'],
          (err) => {
            if (err) reject(err);
            else resolve();
          }
        );
      });

      await new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)`,
          ['user@example.com', userPasswordHash, 'user'],
          (err) => {
            if (err) reject(err);
            else resolve();
          }
        );
      });

      console.log('Тестовые пользователи созданы:');
      console.log('admin@example.com / admin123 (роль: admin)');
      console.log('user@example.com / user123 (роль: user)');
    }
  } catch (error) {
    console.error('Ошибка при создании тестовых данных:', error);
  }
};

// Инициализация тестовых данных при запуске
setTimeout(initializeTestData, 1000);

module.exports = {
  User,
  db
};