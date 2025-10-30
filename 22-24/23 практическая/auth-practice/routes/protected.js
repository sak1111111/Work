const path = require('path');

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, 'dev.sqlite3')
    },
    migrations: {
      directory: path.join(__dirname, 'migrations')
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, cb) => {
        conn.run('PRAGMA foreign_keys = ON', cb);
      }
    }
  },
  
  production: {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, 'prod.sqlite3')
    },
    migrations: {
      directory: path.join(__dirname, 'migrations')
    },
    useNullAsDefault: true
  }
};