const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware для логирования
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
});

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Временное хранилище данных (в реальном приложении - база данных)
let books = [
    {
        id: 1,
        title: "Преступление и наказание",
        author: "Федор Достоевский",
        isbn: "978-5-389-00001-1",
        genre: "Роман",
        year: 1866,
        pages: 608,
        available: true,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
    },
    {
        id: 2,
        title: "Мастер и Маргарита",
        author: "Михаил Булгаков",
        isbn: "978-5-389-00002-8",
        genre: "Роман",
        year: 1967,
        pages: 480,
        available: true,
        createdAt: new Date('2024-01-16'),
        updatedAt: new Date('2024-01-16')
    },
    {
        id: 3,
        title: "1984",
        author: "Джордж Оруэлл",
        isbn: "978-5-389-00003-5",
        genre: "Антиутопия",
        year: 1949,
        pages: 328,
        available: false,
        createdAt: new Date('2024-01-17'),
        updatedAt: new Date('2024-01-17')
    },
    {
        id: 4,
        title: "Война и мир",
        author: "Лев Толстой",
        isbn: "978-5-389-00004-2",
        genre: "Роман-эпопея",
        year: 1869,
        pages: 1225,
        available: true,
        createdAt: new Date('2024-01-18'),
        updatedAt: new Date('2024-01-18')
    },
    {
        id: 5,
        title: "Гарри Поттер и философский камень",
        author: "Джоан Роулинг",
        isbn: "978-5-389-00005-9",
        genre: "Фэнтези",
        year: 1997,
        pages: 432,
        available: true,
        createdAt: new Date('2024-01-19'),
        updatedAt: new Date('2024-01-19')
    }
];

// Вспомогательные функции
const findBookById = (id) => books.find(book => book.id === parseInt(id));
const findBookIndexById = (id) => books.findIndex(book => book.id === parseInt(id));
const isISBNUnique = (isbn, excludeId = null) => {
    return !books.some(book => book.isbn === isbn && book.id !== excludeId);
};
const generateId = () => books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1;

// Валидация данных
const validateBook = (book, isUpdate = false) => {
    const errors = [];

    if (!isUpdate || book.title !== undefined) {
        if (!book.title || book.title.trim().length === 0) {
            errors.push('Название книги обязательно');
        } else if (book.title.length > 200) {
            errors.push('Название книги не должно превышать 200 символов');
        }
    }

    if (!isUpdate || book.author !== undefined) {
        if (!book.author || book.author.trim().length === 0) {
            errors.push('Автор книги обязателен');
        } else if (book.author.length > 100) {
            errors.push('Имя автора не должно превышать 100 символов');
        }
    }

    if (!isUpdate || book.isbn !== undefined) {
        if (!book.isbn || book.isbn.trim().length === 0) {
            errors.push('ISBN обязателен');
        } else if (!/^[0-9-]+$/.test(book.isbn)) {
            errors.push('ISBN должен содержать только цифры и дефисы');
        }
    }

    if (book.year !== undefined && book.year !== null) {
        const currentYear = new Date().getFullYear();
        if (book.year < 1000 || book.year > currentYear) {
            errors.push(`Год издания должен быть между 1000 и ${currentYear}`);
        }
    }

    if (book.pages !== undefined && book.pages !== null) {
        if (book.pages < 1 || book.pages > 10000) {
            errors.push('Количество страниц должно быть от 1 до 10000');
        }
    }

    return errors;
};

// ==================== ROUTES ====================

// GET /api/books - Получить все книги с фильтрацией и пагинацией
app.get('/api/books', (req, res) => {
    try {
        const { 
            page = 1, 
            limit = 10, 
            author, 
            genre, 
            year, 
            available,
            search,
            sortBy = 'title',
            order = 'asc'
        } = req.query;

        let filteredBooks = [...books];

        // Фильтрация по автору
        if (author) {
            filteredBooks = filteredBooks.filter(book => 
                book.author.toLowerCase().includes(author.toLowerCase())
            );
        }

        // Фильтрация по жанру
        if (genre) {
            filteredBooks = filteredBooks.filter(book => 
                book.genre.toLowerCase().includes(genre.toLowerCase())
            );
        }

        // Фильтрация по году
        if (year) {
            filteredBooks = filteredBooks.filter(book => book.year === parseInt(year));
        }

        // Фильтрация по доступности
        if (available !== undefined) {
            const availableBool = available === 'true';
            filteredBooks = filteredBooks.filter(book => book.available === availableBool);
        }

        // Поиск по названию и автору
        if (search) {
            filteredBooks = filteredBooks.filter(book => 
                book.title.toLowerCase().includes(search.toLowerCase()) ||
                book.author.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Сортировка
        filteredBooks.sort((a, b) => {
            const multiplier = order === 'desc' ? -1 : 1;
            
            if (sortBy === 'title') {
                return a.title.localeCompare(b.title) * multiplier;
            } else if (sortBy === 'author') {
                return a.author.localeCompare(b.author) * multiplier;
            } else if (sortBy === 'year') {
                return (a.year - b.year) * multiplier;
            } else if (sortBy === 'pages') {
                return (a.pages - b.pages) * multiplier;
            }
            
            return 0;
        });

        // Пагинация
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const startIndex = (pageNum - 1) * limitNum;
        const endIndex = pageNum * limitNum;
        const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

        // Метаданные для пагинации
        const total = filteredBooks.length;
        const totalPages = Math.ceil(total / limitNum);
        const hasNext = pageNum < totalPages;
        const hasPrev = pageNum > 1;

        res.json({
            success: true,
            data: {
                books: paginatedBooks,
                pagination: {
                    page: pageNum,
                    limit: limitNum,
                    total,
                    totalPages,
                    hasNext,
                    hasPrev,
                    nextPage: hasNext ? pageNum + 1 : null,
                    prevPage: hasPrev ? pageNum - 1 : null
                },
                filters: {
                    author: author || null,
                    genre: genre || null,
                    year: year ? parseInt(year) : null,
                    available: available !== undefined ? available === 'true' : null,
                    search: search || null,
                    sortBy,
                    order
                }
            }
        });

    } catch (error) {
        console.error('Ошибка при получении книг:', error);
        res.status(500).json({
            success: false,
            error: 'Внутренняя ошибка сервера при получении книг'
        });
    }
});

// GET /api/books/:id - Получить книгу по ID
app.get('/api/books/:id', (req, res) => {
    try {
        const bookId = parseInt(req.params.id);
        const book = findBookById(bookId);

        if (!book) {
            return res.status(404).json({
                success: false,
                error: `Книга с ID ${bookId} не найдена`
            });
        }

        res.json({
            success: true,
            data: { book }
        });

    } catch (error) {
        console.error('Ошибка при получении книги:', error);
        res.status(500).json({
            success: false,
            error: 'Внутренняя ошибка сервера при получении книги'
        });
    }
});

// POST /api/books - Создать новую книгу
app.post('/api/books', (req, res) => {
    try {
        const { title, author, isbn, genre, year, pages, available = true } = req.body;

        // Базовая валидация
        const validationErrors = validateBook({ title, author, isbn, year, pages });
        if (validationErrors.length > 0) {
            return res.status(400).json({
                success: false,
                error: 'Ошибки валидации',
                details: validationErrors
            });
        }

        // Проверка уникальности ISBN
        if (!isISBNUnique(isbn)) {
            return res.status(409).json({
                success: false,
                error: 'Книга с таким ISBN уже существует'
            });
        }

        const newBook = {
            id: generateId(),
            title: title.trim(),
            author: author.trim(),
            isbn: isbn.trim(),
            genre: genre ? genre.trim() : null,
            year: year ? parseInt(year) : null,
            pages: pages ? parseInt(pages) : null,
            available: Boolean(available),
            createdAt: new Date(),
            updatedAt: new Date()
        };

        books.push(newBook);

        res.status(201).json({
            success: true,
            message: 'Книга успешно создана',
            data: { book: newBook }
        });

    } catch (error) {
        console.error('Ошибка при создании книги:', error);
        res.status(500).json({
            success: false,
            error: 'Внутренняя ошибка сервера при создании книги'
        });
    }
});

// PUT /api/books/:id - Полное обновление книги
app.put('/api/books/:id', (req, res) => {
    try {
        const bookId = parseInt(req.params.id);
        const bookIndex = findBookIndexById(bookId);

        if (bookIndex === -1) {
            return res.status(404).json({
                success: false,
                error: `Книга с ID ${bookId} не найдена`
            });
        }

        const { title, author, isbn, genre, year, pages, available } = req.body;

        // Валидация всех обязательных полей
        const validationErrors = validateBook({ title, author, isbn, year, pages });
        if (validationErrors.length > 0) {
            return res.status(400).json({
                success: false,
                error: 'Ошибки валидации',
                details: validationErrors
            });
        }

        // Проверка уникальности ISBN (исключая текущую книгу)
        if (!isISBNUnique(isbn, bookId)) {
            return res.status(409).json({
                success: false,
                error: 'Книга с таким ISBN уже существует'
            });
        }

        // Полное обновление
        books[bookIndex] = {
            ...books[bookIndex],
            title: title.trim(),
            author: author.trim(),
            isbn: isbn.trim(),
            genre: genre ? genre.trim() : null,
            year: year ? parseInt(year) : null,
            pages: pages ? parseInt(pages) : null,
            available: Boolean(available),
            updatedAt: new Date()
        };

        res.json({
            success: true,
            message: 'Книга успешно обновлена',
            data: { book: books[bookIndex] }
        });

    } catch (error) {
        console.error('Ошибка при обновлении книги:', error);
        res.status(500).json({
            success: false,
            error: 'Внутренняя ошибка сервера при обновлении книги'
        });
    }
});

// PATCH /api/books/:id - Частичное обновление книги
app.patch('/api/books/:id', (req, res) => {
    try {
        const bookId = parseInt(req.params.id);
        const bookIndex = findBookIndexById(bookId);

        if (bookIndex === -1) {
            return res.status(404).json({
                success: false,
                error: `Книга с ID ${bookId} не найдена`
            });
        }

        const updates = req.body;

        // Валидация только переданных полей
        const validationErrors = validateBook(updates, true);
        if (validationErrors.length > 0) {
            return res.status(400).json({
                success: false,
                error: 'Ошибки валидации',
                details: validationErrors
            });
        }

        // Проверка уникальности ISBN если он обновляется
        if (updates.isbn && !isISBNUnique(updates.isbn, bookId)) {
            return res.status(409).json({
                success: false,
                error: 'Книга с таким ISBN уже существует'
            });
        }

        // Применяем только переданные обновления
        const updatedBook = {
            ...books[bookIndex],
            ...(updates.title && { title: updates.title.trim() }),
            ...(updates.author && { author: updates.author.trim() }),
            ...(updates.isbn && { isbn: updates.isbn.trim() }),
            ...(updates.genre !== undefined && { genre: updates.genre ? updates.genre.trim() : null }),
            ...(updates.year !== undefined && { year: updates.year ? parseInt(updates.year) : null }),
            ...(updates.pages !== undefined && { pages: updates.pages ? parseInt(updates.pages) : null }),
            ...(updates.available !== undefined && { available: Boolean(updates.available) }),
            updatedAt: new Date()
        };

        books[bookIndex] = updatedBook;

        res.json({
            success: true,
            message: 'Книга успешно обновлена',
            data: { book: updatedBook }
        });

    } catch (error) {
        console.error('Ошибка при частичном обновлении книги:', error);
        res.status(500).json({
            success: false,
            error: 'Внутренняя ошибка сервера при обновлении книги'
        });
    }
});

// DELETE /api/books/:id - Удалить книгу
app.delete('/api/books/:id', (req, res) => {
    try {
        const bookId = parseInt(req.params.id);
        const bookIndex = findBookIndexById(bookId);

        if (bookIndex === -1) {
            return res.status(404).json({
                success: false,
                error: `Книга с ID ${bookId} не найдена`
            });
        }

        const deletedBook = books.splice(bookIndex, 1)[0];

        res.json({
            success: true,
            message: 'Книга успешно удалена',
            data: { book: deletedBook }
        });

    } catch (error) {
        console.error('Ошибка при удалении книги:', error);
        res.status(500).json({
            success: false,
            error: 'Внутренняя ошибка сервера при удалении книги'
        });
    }
});

// GET /api/stats - Статистика библиотеки
app.get('/api/stats', (req, res) => {
    try {
        const totalBooks = books.length;
        const availableBooks = books.filter(book => book.available).length;
        const genres = [...new Set(books.map(book => book.genre).filter(Boolean))];
        
        const booksByGenre = genres.reduce((acc, genre) => {
            acc[genre] = books.filter(book => book.genre === genre).length;
            return acc;
        }, {});

        const oldestBook = books.reduce((oldest, book) => 
            !oldest || book.year < oldest.year ? book : oldest, null
        );
        
        const newestBook = books.reduce((newest, book) => 
            !newest || book.year > newest.year ? book : newest, null
        );

        res.json({
            success: true,
            data: {
                totalBooks,
                availableBooks,
                unavailableBooks: totalBooks - availableBooks,
                genres: genres.length,
                booksByGenre,
                oldestBook: oldestBook ? { title: oldestBook.title, year: oldestBook.year } : null,
                newestBook: newestBook ? { title: newestBook.title, year: newestBook.year } : null
            }
        });

    } catch (error) {
        console.error('Ошибка при получении статистики:', error);
        res.status(500).json({
            success: false,
            error: 'Внутренняя ошибка сервера при получении статистики'
        });
    }
});

// Обработка 404 для API маршрутов
app.use('/api/*', (req, res) => {
    res.status(404).json({
        success: false,
        error: `API маршрут ${req.method} ${req.originalUrl} не найден`
    });
});

// Главная страница с документацией
app.get('/', (req, res) => {
    res.json({
        message: '📚 REST API для управления библиотекой книг',
        version: '1.0.0',
        endpoints: {
            'GET /api/books': 'Получить все книги (с фильтрацией и пагинацией)',
            'GET /api/books/:id': 'Получить книгу по ID',
            'POST /api/books': 'Создать новую книгу',
            'PUT /api/books/:id': 'Полное обновление книги',
            'PATCH /api/books/:id': 'Частичное обновление книги',
            'DELETE /api/books/:id': 'Удалить книгу',
            'GET /api/stats': 'Статистика библиотеки'
        },
        queryParameters: {
            'page': 'Номер страницы (по умолчанию: 1)',
            'limit': 'Количество элементов на странице (по умолчанию: 10)',
            'author': 'Фильтр по автору',
            'genre': 'Фильтр по жанру',
            'year': 'Фильтр по году издания',
            'available': 'Фильтр по доступности (true/false)',
            'search': 'Поиск по названию и автору',
            'sortBy': 'Поле для сортировки (title, author, year, pages)',
            'order': 'Порядок сортировки (asc/desc)'
        }
    });
});

// Централизованная обработка ошибок
app.use((error, req, res, next) => {
    console.error('Необработанная ошибка:', error);
    res.status(500).json({
        success: false,
        error: 'Внутренняя ошибка сервера'
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на порту ${PORT}`);
    console.log(`📚 API доступен по адресу: http://localhost:${PORT}`);
    console.log(`📖 Документация: http://localhost:${PORT}/`);
    console.log(`🔢 Всего книг в библиотеке: ${books.length}`);
});