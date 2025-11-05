const http = require('http');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');
const path = require('path');

// Данные
let users = [
    { id: 1, name: 'Иван', age: 25 },
    { id: 2, name: 'Мария', age: 30 },
    { id: 3, name: 'Петр', age: 35 }
];

// Middleware для логирования
function logger(req, res, next) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url} - ${req.headers['user-agent']}`);
    next();
}

// Middleware для парсинга JSON
function parseJSON(req, res, next) {
    if (req.method === 'POST' || req.method === 'PUT') {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                if (body) {
                    req.body = JSON.parse(body);
                }
                next();
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ error: 'Неверный формат JSON' }));
            }
        });
    } else {
        next();
    }
}

// Middleware для статических файлов
function serveStatic(req, res, next) {
    const parsedUrl = url.parse(req.url);
    let pathname = `static${parsedUrl.pathname}`;
    
    // Если запрос к корню, отдаем index.html
    if (parsedUrl.pathname === '/') {
        pathname = 'static/index.html';
    }
    
    const ext = path.parse(pathname).ext;
    const map = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
        '.ico': 'image/x-icon',
        '.json': 'application/json'
    };
    
    fs.exists(pathname, (exist) => {
        if (!exist) {
            next();
            return;
        }
        
        if (fs.statSync(pathname).isDirectory()) {
            next();
            return;
        }
        
        const contentType = map[ext] || 'text/plain';
        res.setHeader('Content-Type', contentType);
        
        fs.readFile(pathname, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end(`Ошибка сервера: ${err}`);
            } else {
                res.writeHead(200);
                res.end(data);
            }
        });
    });
}

// Функция для обработки middleware
function useMiddleware(req, res, middlewares, finalHandler) {
    let index = 0;
    
    function next() {
        if (index < middlewares.length) {
            const middleware = middlewares[index++];
            middleware(req, res, next);
        } else {
            finalHandler(req, res);
        }
    }
    
    next();
}

const server = http.createServer((req, res) => {
    // Установка заголовков CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    const middlewares = [logger, serveStatic, parseJSON];
    
    useMiddleware(req, res, middlewares, (req, res) => {
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;
        const method = req.method;
        
        // API маршруты
        if (pathname === '/api/users' && method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify(users));
        }
        
        else if (pathname === '/api/users' && method === 'POST') {
            const newUser = {
                id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
                ...req.body
            };
            users.push(newUser);
            
            res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify(newUser));
        }
        
        else if (pathname.startsWith('/api/users/') && method === 'GET') {
            const userId = parseInt(pathname.split('/')[3]);
            const user = users.find(u => u.id === userId);
            
            if (user) {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify(user));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ error: 'Пользователь не найден' }));
            }
        }
        
        else if (pathname.startsWith('/api/users/') && method === 'PUT') {
            const userId = parseInt(pathname.split('/')[3]);
            const userIndex = users.findIndex(u => u.id === userId);
            
            if (userIndex !== -1) {
                users[userIndex] = { ...users[userIndex], ...req.body };
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify(users[userIndex]));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ error: 'Пользователь не найден' }));
            }
        }
        
        else if (pathname.startsWith('/api/users/') && method === 'DELETE') {
            const userId = parseInt(pathname.split('/')[3]);
            const userIndex = users.findIndex(u => u.id === userId);
            
            if (userIndex !== -1) {
                const deletedUser = users.splice(userIndex, 1)[0];
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify(deletedUser));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ error: 'Пользователь не найден' }));
            }
        }
        
        // Статус сервера
        else if (pathname === '/api/status' && method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({
                status: 'OK',
                timestamp: new Date().toISOString(),
                usersCount: users.length
            }));
        }
        
        // Неизвестный маршрут
        else {
            res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: 'Маршрут не найден' }));
        }
    });
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Продвинутый сервер запущен на порту ${PORT}`);
    console.log(`Доступен по адресу: http://localhost:${PORT}`);
    
    // Создаем папку static если её нет
    if (!fs.existsSync('static')) {
        fs.mkdirSync('static');
    }
});