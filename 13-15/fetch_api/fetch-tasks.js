// fetch-tests.js
async function runTest(testName, testFunction) {
    console.log(`🧪 Запуск теста: ${testName}`);
    try {
        await testFunction();
        console.log(`✅ Тест пройден: ${testName}`);
        return true;
    } catch (error) {
        console.error(`❌ Тест не пройден: ${testName}`, error);
        return false;
    }
}

// Тесты для GET запросов
async function testFetchGetRequest() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    if (!response.ok) throw new Error('GET запрос не удался');
    const data = await response.json();
    if (!data.title) throw new Error('Некорректные данные');
}

async function testFetchJsonData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    if (!Array.isArray(users) || users.length === 0) {
        throw new Error('Некорректные данные пользователей');
    }
}

// Тесты для CRUD операций
async function testFetchPostRequest() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Test', body: 'Content', userId: 1 })
    });
    const data = await response.json();
    if (!data.id) throw new Error('POST запрос не вернул ID');
}

async function testFetchPutRequest() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: 1, title: 'Updated', body: 'Content', userId: 1 })
    });
    const data = await response.json();
    if (data.title !== 'Updated') throw new Error('PUT запрос не обновил данные');
}

// Тесты для обработки ошибок
async function testFetchHttpError() {
    const response = await fetch('https://jsonplaceholder.typicode.com/nonexistent');
    if (response.status !== 404) throw new Error('Ожидалась 404 ошибка');
}

// Тесты для параллельных запросов
async function testFetchWithPromiseAll() {
    const startTime = Date.now();
    const [users, posts] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/users').then(r => r.json()),
        fetch('https://jsonplaceholder.typicode.com/posts').then(r => r.json())
    ]);
    if (!users.length || !posts.length) throw new Error('Promise.all не работает');
}

// Запуск всех тестов
async function runAllTests() {
    console.log('🚀 Запуск тестов Fetch API\n');
    
    const tests = [
        { name: 'GET запрос', test: testFetchGetRequest },
        { name: 'JSON данные', test: testFetchJsonData },
        { name: 'POST запрос', test: testFetchPostRequest },
        { name: 'PUT запрос', test: testFetchPutRequest },
        { name: 'HTTP ошибки', test: testFetchHttpError },
        { name: 'Promise.all', test: testFetchWithPromiseAll }
    ];
    
    let passed = 0;
    for (const test of tests) {
        const result = await runTest(test.name, test.test);
        if (result) passed++;
    }
    
    console.log(`\n📊 Итоги: ${passed}/${tests.length} тестов пройдено`);
    
    // Визуальный отчет в DOM
    if (typeof document !== 'undefined') {
        const testReport = document.createElement('div');
        testReport.innerHTML = `
            <div style="background: white; padding: 20px; margin: 20px 0; border-radius: 8px;">
                <h3>📋 Отчет тестирования Fetch API</h3>
                <p><strong>Пройдено:</strong> ${passed} тестов</p>
                <p><strong>Всего:</strong> ${tests.length} тестов</p>
                <p><strong>Результат:</strong> ${Math.round((passed/tests.length)*100)}%</p>
                <p>Подробности в консоли (F12)</p>
            </div>
        `;
        document.body.prepend(testReport);
    }
}

// Добавление кнопки тестирования в интерфейс
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        const testButton = document.createElement('button');
        testButton.textContent = '🧪 Запустить тесты';
        testButton.style.background = '#9b59b6';
        testButton.addEventListener('click', runAllTests);
        
        const container = document.querySelector('.container');
        if (container) {
            container.prepend(testButton);
        }
    });
}