async function testBasicPromise() {
    const result = await createBasicPromise(true);
    if (!result.includes('Успех')) throw new Error('Тест провален');
}

async function testPromiseError() {
    try {
        await createBasicPromise(false);
        throw new Error('Ожидалась ошибка');
    } catch (e) {
        if (!e.includes('Ошибка')) throw e;
    }
}

async function testAsyncAwait() {
    const result = await createBasicPromise(true);
    if (!result.includes('Успех')) throw new Error('Async/await не работает');
}

async function testParallelExecution() {
    const start = Date.now();
    await Promise.all([delayWithPromise(100), delayWithPromise(200)]);
    if (Date.now() - start > 250) throw new Error('Параллельное выполнение нарушено');
}

async function testPromiseRace() {
    const winner = await Promise.race([
        delayWithPromise(100).then(() => 'first'),
        delayWithPromise(200).then(() => 'second')
    ]);
    if (winner !== 'first') throw new Error('Promise.race не работает');
}

async function testApiRequests() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const user = await response.json();
    if (!user.name) throw new Error('API запрос не удался');
}

async function runAllTests() {
    const tests = [
        {name: 'Базовые промисы', test: testBasicPromise},
        {name: 'Ошибки промисов', test: testPromiseError},
        {name: 'Async/await', test: testAsyncAwait},
        {name: 'Параллельное выполнение', test: testParallelExecution},
        {name: 'Promise.race', test: testPromiseRace},
        {name: 'API запросы', test: testApiRequests}
    ];
    
    let passed = 0;
    for (const test of tests) {
        try {
            await test.test();
            console.log(`✅ ${test.name}`);
            passed++;
        } catch (e) {
            console.log(`❌ ${test.name}: ${e.message}`);
        }
    }
    console.log(` Результат: ${passed}/${tests.length}`);
}

if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        const btn = document.createElement('button');
        btn.textContent = ' Запустить тесты';
        btn.onclick = runAllTests;
        document.body.prepend(btn);
    });
}