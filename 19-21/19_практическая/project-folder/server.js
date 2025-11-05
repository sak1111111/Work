const http = require('http');
const url = require('url');
const querystring = require('querystring');

// Данные для примера (обычно хранятся в базе данных)
let users = [
    { id: 1, name: 'Иван', age: 25 },
    { id: 2, name: 'Мария', age: 30 },
    { id: 3, name: 'Петр', age: 35 }
];

let products = [
    { id: 1, name: 'Ноутбук', price: 50000 },
    { id: 2, name: 'Телефон', price: 25000 },
    { id: 3, name: 'Планшет', price: 30000 }
];

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    // Установка заголовков CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Главная страница
    if (pathname === '/' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
            <html>
                <head><title>Главная страница</title></head>
                <body>
                    <h1>Добро пожаловать на наш сервер!</h1>
                    <p>Доступные эндпоинты:</p>
                    <ul>
                        <li>GET /users - список пользователей</li>
                        <li>GET /users/{id} - пользователь по ID</li>
                        <li>POST /users - создать пользователя</li>
                        <li>GET /products - список товаров</li>
                        <li>GET /products/{id} - товар по ID</li>
                        <li>GET /search?query=... - поиск</li>
                    </ul>
                </body>
            </html>
        `);
    }

    // Работа с пользователями
    else if (pathname === '/users' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(users));
    }

    else if (pathname.startsWith('/users/') && method === 'GET') {
        const userId = parseInt(pathname.split('/')[2]);
        const user = users.find(u => u.id === userId);
        
        if (user) {
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify(user));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: 'Пользователь не найден' }));
        }
    }

    else if (pathname === '/users' && method === 'POST') {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const newUser = JSON.parse(body);
                newUser.id = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
                users.push(newUser);
                
                res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify(newUser));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ error: 'Неверный формат данных' }));
            }
        });
    }

    // Работа с товарами
    else if (pathname === '/products' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(products));
    }

    else if (pathname.startsWith('/products/') && method === 'GET') {
        const productId = parseInt(pathname.split('/')[2]);
        const product = products.find(p => p.id === productId);
        
        if (product) {
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify(product));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: 'Товар не найден' }));
        }
    }

    // Поиск
    else if (pathname === '/search' && method === 'GET') {
        const query = parsedUrl.query.query?.toLowerCase() || '';
        
        const userResults = users.filter(user => 
            user.name.toLowerCase().includes(query)
        );
        
        const productResults = products.filter(product => 
            product.name.toLowerCase().includes(query)
        );
        
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({
            users: userResults,
            products: productResults
        }));
    }

    // Обработка неизвестных маршрутов
    else {
        res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: 'Маршрут не найден' }));
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
    console.log(`Доступен по адресу: http://localhost:${PORT}`);
});