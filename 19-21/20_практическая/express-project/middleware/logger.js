function logger(req, res, next) {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const ip = req.ip || req.connection.remoteAddress;
    
    console.log(`[${timestamp}] ${method} ${url} - IP: ${ip} - User-Agent: ${req.get('User-Agent')}`);
    
    // Сохраняем время начала обработки запроса
    const startTime = Date.now();
    
    // Перехватываем метод end для логирования времени выполнения
    const originalEnd = res.end;
    res.end = function(chunk, encoding) {
        const duration = Date.now() - startTime;
        console.log(`[${timestamp}] ${method} ${url} - Status: ${res.statusCode} - Duration: ${duration}ms`);
        
        originalEnd.call(this, chunk, encoding);
    };
    
    next();
}

module.exports = logger;