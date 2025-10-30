const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async create(userData) {
    const { email, password, role = 'user' } = userData;
    
    // Хеширование пароля
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);
    
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)`;
      db.run(sql, [email, password_hash, role], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, email, role });
        }
      });
    });
  }

  static async findByEmail(email) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM users WHERE email = ?`;
      db.get(sql, [email], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  static async findById(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT id, email, role, created_at FROM users WHERE id = ?`;
      db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  static async update(id, updates) {
    const fields = [];
    const values = [];
    
    if (updates.email) {
      fields.push('email = ?');
      values.push(updates.email);
    }
    
    if (updates.password) {
      const saltRounds = 10;
      const password_hash = await bcrypt.hash(updates.password, saltRounds);
      fields.push('password_hash = ?');
      values.push(password_hash);
    }
    
    if (updates.role) {
      fields.push('role = ?');
      values.push(updates.role);
    }
    
    fields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);
    
    const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
    
    return new Promise((resolve, reject) => {
      db.run(sql, values, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  }
}

module.exports = User;