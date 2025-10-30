function logToOutput(msg, id, type = 'info') {
    const output = document.getElementById(id);
    if (output) {
        const div = document.createElement('div');
        div.className = type;
        div.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
        output.appendChild(div);
    }
}

function createBasicPromise(shouldResolve = true) {
    return new Promise((resolve, reject) => {
        setTimeout(() => shouldResolve ? 
            resolve("Успех!") : 
            reject("Ошибка!"), 1000);
    });
}

function handleBasicPromise() {
    logToOutput('Запуск промиса...', 'promise-output', 'loading');
    createBasicPromise(true)
        .then(r => logToOutput(r, 'promise-output', 'success'))
        .catch(e => logToOutput(e, 'promise-output', 'error'));
}

function createPromiseChain() {
    logToOutput('Цепочка промисов...', 'promise-output', 'loading');
    createBasicPromise(true)
        .then(r => { logToOutput(`Шаг1: ${r}`, 'promise-output', 'success'); return r + '→Шаг2'; })
        .then(r => { logToOutput(`Шаг2: ${r}`, 'promise-output', 'success'); return r + '→Шаг3'; })
        .then(r => logToOutput(`Шаг3: ${r}`, 'promise-output', 'success'))
        .catch(e => logToOutput(e, 'promise-output', 'error'));
}

function handlePromiseError() {
    createBasicPromise(false)
        .catch(e => logToOutput(`Ошибка: ${e}`, 'promise-output', 'error'));
}

async function basicAsyncAwait() {
    try {
        const result = await createBasicPromise(true);
        logToOutput(result, 'async-output', 'success');
    } catch (e) {
        logToOutput(e, 'async-output', 'error');
    }
}

async function parallelAsyncExecution() {
    const start = Date.now();
    const results = await Promise.all([
        createBasicPromise(true),
        createBasicPromise(true),
        createBasicPromise(true)
    ]);
    logToOutput(`Выполнено за ${Date.now() - start}мс: ${results}`, 'async-output', 'success');
}

async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
        users.forEach(user => 
            logToOutput(user.name, 'api-output', 'success'));
    } catch (e) {
        logToOutput(`Ошибка API: ${e}`, 'api-output', 'error');
    }
}

async function createPost() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title: 'Test', body: 'Content', userId: 1})
    });
    const data = await response.json();
    logToOutput(`Создан пост: ${data.id}`, 'api-output', 'success');
}

let intervalId;
function startAsyncInterval() {
    let counter = 0;
    intervalId = setInterval(() => {
        logToOutput(`Интервал: ${counter++}`, 'timer-output', 'info');
    }, 1000);
}

function stopAsyncInterval() {
    clearInterval(intervalId);
    logToOutput('Интервал остановлен', 'timer-output', 'success');
}

function delayWithPromise(ms) {
    return new Promise(resolve => setTimeout(() => resolve(`Задержка ${ms}мс`), ms));
}

async function testDelay() {
    await delayWithPromise(1000);
    logToOutput('Задержка завершена', 'timer-output', 'success');
}

async function handleMultipleErrors() {
    const results = await Promise.allSettled([
        createBasicPromise(true),
        createBasicPromise(false),
        createBasicPromise(true)
    ]);
    const success = results.filter(r => r.status === 'fulfilled').length;
    logToOutput(`Успешно: ${success}/${results.length}`, 'error-output', 'info');
}

async function retryWithBackoff(operation, maxRetries = 3) {
    for (let i = 1; i <= maxRetries; i++) {
        try {
            return await operation();
        } catch (e) {
            if (i === maxRetries) throw e;
            await delayWithPromise(100 * Math.pow(2, i));
        }
    }
}

async function demonstratePromiseAll() {
    const start = Date.now();
    const results = await Promise.all([
        delayWithPromise(300),
        delayWithPromise(500),
        delayWithPromise(700)
    ]);
    logToOutput(`Promise.all: ${results} за ${Date.now() - start}мс`, 'parallel-output', 'success');
}

async function demonstratePromiseRace() {
    const winner = await Promise.race([
        delayWithPromise(500).then(() => 'Медленный'),
        delayWithPromise(100).then(() => 'Быстрый')
    ]);
    logToOutput(`Promise.race победил: ${winner}`, 'parallel-output', 'success');
}

function setupEvents() {
    document.getElementById('basic-promise')?.addEventListener('click', handleBasicPromise);
    document.getElementById('promise-chain')?.addEventListener('click', createPromiseChain);
    document.getElementById('promise-error')?.addEventListener('click', handlePromiseError);
    document.getElementById('basic-async')?.addEventListener('click', basicAsyncAwait);
    document.getElementById('async-parallel')?.addEventListener('click', parallelAsyncExecution);
    document.getElementById('fetch-users')?.addEventListener('click', fetchUsers);
    document.getElementById('fetch-post')?.addEventListener('click', createPost);
    document.getElementById('start-interval')?.addEventListener('click', startAsyncInterval);
    document.getElementById('stop-interval')?.addEventListener('click', stopAsyncInterval);
    document.getElementById('delay-promise')?.addEventListener('click', testDelay);
    document.getElementById('multiple-errors')?.addEventListener('click', handleMultipleErrors);
    document.getElementById('promise-all')?.addEventListener('click', demonstratePromiseAll);
    document.getElementById('promise-race')?.addEventListener('click', demonstratePromiseRace);
}

document.addEventListener('DOMContentLoaded', setupEvents);