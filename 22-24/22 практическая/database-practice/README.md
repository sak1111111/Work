# Library API

REST API для управления библиотечной системой с использованием Node.js, Express и SQLite.

## Структура базы данных

### Таблицы

#### authors
- `id` (INTEGER, PRIMARY KEY, AUTOINCREMENT)
- `name` (TEXT, NOT NULL)
- `bio` (TEXT)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

#### categories
- `id` (INTEGER, PRIMARY KEY, AUTOINCREMENT)
- `name` (TEXT, NOT NULL, UNIQUE)
- `description` (TEXT)
- `created_at` (TIMESTAMP)

#### books
- `id` (INTEGER, PRIMARY KEY, AUTOINCREMENT)
- `title` (TEXT, NOT NULL)
- `isbn` (TEXT, UNIQUE)
- `publication_year` (INTEGER)
- `pages` (INTEGER)
- `author_id` (INTEGER, FOREIGN KEY)
- `category_id` (INTEGER, FOREIGN KEY)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Связи
- `books.author_id` → `authors.id` (CASCADE DELETE)
- `books.category_id` → `categories.id` (SET NULL DELETE)

## Установка и запуск

1. **Установка зависимостей:**
```bash
   npm install