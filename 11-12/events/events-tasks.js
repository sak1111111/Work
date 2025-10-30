function handleBasicClick(event) {
    const output = document.getElementById('basic-output');
    
    const eventInfo = {
        type: event.type,
        target: event.target.tagName,
        clientX: event.clientX,
        clientY: event.clientY,
        timestamp: new Date().toLocaleTimeString()
    };
    
    output.innerHTML = `
        <div class="info fade-in">
            <strong>Информация о событии:</strong><br>
            Тип: ${eventInfo.type}<br>
            Элемент: ${eventInfo.target}<br>
            Координаты: (${eventInfo.clientX}, ${eventInfo.clientY})<br>
            Время: ${eventInfo.timestamp}
        </div>
    `;
    
    event.target.classList.add('pulse');
    setTimeout(() => {
        event.target.classList.remove('pulse');
    }, 500);
}

function handleMouseEvents(event) {
    const colorBox = document.getElementById('color-box');
    const output = document.getElementById('mouse-output');
    
    switch(event.type) {
        case 'mouseenter':
            colorBox.style.backgroundColor = '#e74c3c';
            colorBox.textContent = 'Курсор внутри';
            break;
            
        case 'mouseleave':
            colorBox.style.backgroundColor = '#3498db';
            colorBox.textContent = 'Наведи курсор';
            break;
            
        case 'mousemove':
            const rect = colorBox.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            
            output.innerHTML = `
                <div class="info">
                    Координаты внутри элемента: (${Math.round(x)}, ${Math.round(y)})<br>
                    Ширина: ${rect.width}px, Высота: ${rect.height}px
                </div>
            `;
            break;
    }
}

function setupBasicEvents() {
    const basicBtn = document.getElementById('basic-btn');
    const colorBox = document.getElementById('color-box');
    
    basicBtn.addEventListener('click', handleBasicClick);
    
    colorBox.addEventListener('mouseenter', handleMouseEvents);
    colorBox.addEventListener('mouseleave', handleMouseEvents);
    colorBox.addEventListener('mousemove', handleMouseEvents);
}

function handleKeyEvents(event) {
    const output = document.getElementById('key-output');
    
    const keyInfo = {
        key: event.key,
        code: event.code,
        ctrlKey: event.ctrlKey,
        altKey: event.altKey,
        shiftKey: event.shiftKey,
        type: event.type
    };
    
    let specialMessage = '';
    
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        specialMessage = '<div class="warning">Сохранение предотвращено (Ctrl+S)</div>';
    }
    
    if (event.altKey && event.key === 'c') {
        event.preventDefault();
        specialMessage = '<div class="warning">Действие предотвращено (Alt+C)</div>';
    }
    
    if (event.shiftKey && event.key === 'a') {
        event.preventDefault();
        specialMessage = '<div class="warning">Действие предотвращено (Shift+A)</div>';
    }
    
    output.innerHTML = `
        ${specialMessage}
        <div class="info fade-in">
            <strong>Информация о клавише:</strong><br>
            Клавиша: "${keyInfo.key}"<br>
            Код: ${keyInfo.code}<br>
            Ctrl: ${keyInfo.ctrlKey}<br>
            Alt: ${keyInfo.altKey}<br>
            Shift: ${keyInfo.shiftKey}<br>
            Тип события: ${keyInfo.type}
        </div>
    `;
}

function setupKeyboardEvents() {
    const keyInput = document.getElementById('key-input');
    
    keyInput.addEventListener('keydown', handleKeyEvents);
    keyInput.addEventListener('keyup', (event) => {
        console.log('Keyup:', event.key);
    });
    
    keyInput.focus();
}

function handleDelegationClick(event) {
    const target = event.target;
    
    if (target.classList.contains('item') || target.parentElement.classList.contains('item')) {
        const item = target.classList.contains('item') ? target : target.parentElement;
        item.classList.toggle('selected');
    }
    
    if (target.classList.contains('delete')) {
        const item = target.closest('.item');
        if (item) {
            item.remove();
        }
    }
    
    updateDelegationOutput();
}

function updateDelegationOutput() {
    const output = document.getElementById('delegation-output');
    const selectedItems = document.querySelectorAll('.item.selected');
    const allItems = document.querySelectorAll('.item');
    
    output.innerHTML = `
        <div class="info">
            <strong>Статус списка:</strong><br>
            Всего элементов: ${allItems.length}<br>
            Выбрано элементов: ${selectedItems.length}<br>
            ID выбранных: [${Array.from(selectedItems).map(item => item.dataset.id).join(', ')}]
        </div>
    `;
}

function addNewItem() {
    const itemList = document.getElementById('item-list');
    const items = itemList.querySelectorAll('.item');
    const nextId = items.length + 1;
    
    const newItem = document.createElement('li');
    newItem.className = 'item fade-in';
    newItem.dataset.id = nextId.toString();
    
    newItem.innerHTML = `
        <span>Элемент ${nextId}</span>
        <button class="delete">×</button>
    `;
    
    itemList.appendChild(newItem);
    updateDelegationOutput();
}

function setupDelegationEvents() {
    const itemList = document.getElementById('item-list');
    const addBtn = document.getElementById('add-item-btn');
    
    itemList.addEventListener('click', handleDelegationClick);
    addBtn.addEventListener('click', addNewItem);
    updateDelegationOutput();
}

function preventLinkDefault(event) {
    event.preventDefault();
    
    const output = document.getElementById('prevention-output');
    output.innerHTML = `
        <div class="warning shake">
            ⚠️ Переход по ссылке предотвращен!<br>
            Обычно вы бы перешли на: ${event.target.href}
        </div>
    `;
    
    event.target.classList.add('shake');
    setTimeout(() => {
        event.target.classList.remove('shake');
    }, 500);
}

function preventFormSubmit(event) {
    event.preventDefault();
    
    const input = document.getElementById('prevent-input');
    const output = document.getElementById('prevention-output');
    
    if (!input.value.trim()) {
        output.innerHTML = `
            <div class="error shake">
                ❌ Ошибка: поле не должно быть пустым!
            </div>
        `;
        
        input.classList.add('shake');
        setTimeout(() => {
            input.classList.remove('shake');
        }, 500);
        return;
    }
    
    output.innerHTML = `
        <div class="success bounce">
            ✅ Форма обработана успешно!<br>
            Введенный текст: "<strong>${input.value}</strong>"<br>
            <small>Обычно форма была бы отправлена на сервер</small>
        </div>
    `;
    
    input.value = '';
}

function setupPreventionEvents() {
    const preventLink = document.getElementById('prevent-link');
    const preventForm = document.getElementById('prevent-form');
    
    preventLink.addEventListener('click', preventLinkDefault);
    preventForm.addEventListener('submit', preventFormSubmit);
}

function triggerCustomEvent() {
    const customEvent = new CustomEvent('customAction', {
        detail: {
            message: "Привет от кастомного события!",
            timestamp: new Date().toLocaleTimeString(),
            randomNumber: Math.random()
        },
        bubbles: true,
        cancelable: true
    });
    
    document.dispatchEvent(customEvent);
}

function handleCustomEvent(event) {
    const output = document.getElementById('custom-output');
    const { message, timestamp, randomNumber } = event.detail;
    
    output.innerHTML = `
        <div class="success bounce">
            🎉 Кастомное событие обработано!<br>
            Сообщение: <strong>${message}</strong><br>
            Время: ${timestamp}<br>
            Случайное число: ${randomNumber.toFixed(4)}
        </div>
    `;
    
    const btn = document.getElementById('trigger-custom');
    btn.classList.add('bounce');
    setTimeout(() => {
        btn.classList.remove('bounce');
    }, 500);
}

function setupMultipleListeners() {
    document.addEventListener('customAction', function(event) {
        console.log('Первый обработчик:', event.detail);
    });
    
    document.addEventListener('customAction', function(event) {
        console.log('Второй обработчик:', event.detail.timestamp);
    });
    
    document.addEventListener('customAction', function(event) {
        const output = document.getElementById('custom-output');
        output.innerHTML += `
            <div class="info">
                📢 Третий обработчик сработал!<br>
                Всего обработчиков: 3
            </div>
        `;
    });
    
    triggerCustomEvent();
}

function setupCustomEvents() {
    const triggerBtn = document.getElementById('trigger-custom');
    const multipleBtn = document.getElementById('multiple-listeners');
    
    document.addEventListener('customAction', handleCustomEvent);
    triggerBtn.addEventListener('click', triggerCustomEvent);
    multipleBtn.addEventListener('click', setupMultipleListeners);
}

function loadImageWithEvents() {
    const container = document.getElementById('image-container');
    const output = document.getElementById('loading-output');
    
    container.innerHTML = '';
    output.innerHTML = '<div class="info">🔄 Начало загрузки изображения котёнка...</div>';
    
    const img = new Image();
    
    img.addEventListener('loadstart', () => {
        output.innerHTML += '<div class="info">📦 Загрузка началась...</div>';
    });
    
    img.addEventListener('load', () => {
        output.innerHTML += '<div class="success">✅ Изображение котёнка успешно загружено!</div>';
        container.appendChild(img);
    });
    
    img.addEventListener('error', () => {
        output.innerHTML += '<div class="error">❌ Ошибка загрузки изображения котёнка!</div>';
    });
    
    img.addEventListener('loadend', () => {
        output.innerHTML += '<div class="info">🏁 Загрузка завершена.</div>';
    });
    
    img.src = 'https://placekitten.com/300/200?' + Date.now();
    img.alt = 'Милый котёнок';
}

function simulateLoadError() {
    const container = document.getElementById('image-container');
    const output = document.getElementById('loading-output');
    
    container.innerHTML = '';
    output.innerHTML = '<div class="info">🔄 Попытка загрузки несуществующего изображения котёнка...</div>';
    
    const img = new Image();
    
    img.addEventListener('error', () => {
        output.innerHTML += `
            <div class="error shake">
                ❌ Ошибка загрузки изображения котёнка!<br>
                <small>Изображение по указанному URL не существует</small>
            </div>
        `;
    });
    
    img.src = 'https://invalid-kitten-website-that-does-not-exist.com/kitten.jpg?' + Date.now();
}

function setupLoadingEvents() {
    const loadBtn = document.getElementById('load-image');
    const errorBtn = document.getElementById('load-error');
    
    loadBtn.addEventListener('click', loadImageWithEvents);
    errorBtn.addEventListener('click', simulateLoadError);
}

let timerInterval;
let timerValue = 0;

function startTimer() {
    const output = document.getElementById('timer-output');
    const startBtn = document.getElementById('start-timer');
    
    if (timerInterval) {
        output.textContent = 'Таймер уже запущен!';
        return;
    }
    
    timerValue = 0;
    output.textContent = '0 сек';
    startBtn.disabled = true;
    
    timerInterval = setInterval(() => {
        timerValue++;
        output.textContent = `${timerValue} сек`;
        
        if (timerValue % 5 === 0) {
            output.classList.add('pulse');
            setTimeout(() => output.classList.remove('pulse'), 500);
        }
    }, 1000);
}

function stopTimer() {
    const startBtn = document.getElementById('start-timer');
    
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        startBtn.disabled = false;
        
        const output = document.getElementById('timer-output');
        output.innerHTML = `<span class="success">⏱️ Таймер остановлен: ${timerValue} сек</span>`;
    }
}

function createDebounce(func, delay) {
    let timeoutId;
    
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

function createThrottle(func, interval) {
    let lastCall = 0;
    let timeoutId;
    
    return function(...args) {
        const now = Date.now();
        
        if (now - lastCall < interval) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                lastCall = now;
                func.apply(this, args);
            }, interval - (now - lastCall));
            return;
        }
        
        lastCall = now;
        func.apply(this, args);
    };
}

function testDebounce() {
    const output = document.getElementById('async-output');
    output.innerHTML = '<div class="info">🔍 Тестирование Debounce...</div>';
    
    let normalCount = 0;
    const normalFunc = () => {
        normalCount++;
        output.innerHTML += `<div>Обычный вызов: ${normalCount}</div>`;
    };
    
    let debounceCount = 0;
    const debounceFunc = createDebounce(() => {
        debounceCount++;
        output.innerHTML += `<div class="success">Debounce вызов: ${debounceCount}</div>`;
    }, 1000);
    
    output.innerHTML += '<div class="warning">Быстрые вызовы (5 раз)...</div>';
    
    for (let i = 0; i < 5; i++) {
        normalFunc();
        debounceFunc();
    }
    
    output.innerHTML += '<div class="info">Debounce сработает только один раз через 1 секунду</div>';
}

function testThrottle() {
    const output = document.getElementById('async-output');
    output.innerHTML = '<div class="info">🔍 Тестирование Throttle...</div>';
    
    let normalCount = 0;
    const normalFunc = () => {
        normalCount++;
        output.innerHTML += `<div>Обычный вызов: ${normalCount}</div>`;
    };
    
    let throttleCount = 0;
    const throttleFunc = createThrottle(() => {
        throttleCount++;
        output.innerHTML += `<div class="success">Throttle вызов: ${throttleCount}</div>`;
    }, 1000);
    
    output.innerHTML += '<div class="warning">Быстрые вызовы в течение 3 секунд...</div>';
    
    const startTime = Date.now();
    const testInterval = setInterval(() => {
        normalFunc();
        throttleFunc();
        
        if (Date.now() - startTime > 3000) {
            clearInterval(testInterval);
            output.innerHTML += '<div class="info">Тестирование завершено</div>';
        }
    }, 200);
}

function setupTimerEvents() {
    const startBtn = document.getElementById('start-timer');
    const stopBtn = document.getElementById('stop-timer');
    const debounceBtn = document.getElementById('debounce-btn');
    const throttleBtn = document.getElementById('throttle-btn');
    
    startBtn.addEventListener('click', startTimer);
    stopBtn.addEventListener('click', stopTimer);
    debounceBtn.addEventListener('click', testDebounce);
    throttleBtn.addEventListener('click', testThrottle);
}

document.addEventListener('DOMContentLoaded', function() {
    setupBasicEvents();
    setupKeyboardEvents();
    setupDelegationEvents();
    setupPreventionEvents();
    setupCustomEvents();
    setupLoadingEvents();
    setupTimerEvents();
    
    console.log('🚀 Все обработчики событий инициализированы!');
    
    const testBtn = document.createElement('button');
    testBtn.textContent = '🧪 Запустить тесты';
    testBtn.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        z-index: 1000;
    `;
    
    testBtn.addEventListener('click', () => {
        if (typeof runAllTests === 'function') {
            runAllTests();
        } else {
            console.log('Тесты не загружены');
        }
    });
    
    document.body.appendChild(testBtn);
});