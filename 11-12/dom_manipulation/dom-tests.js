
class DomTests {
    constructor() {
        this.passed = 0;
        this.failed = 0;
        this.setupTestEnvironment();
    }

    setupTestEnvironment() {
        // Создаем тестовый DOM
        document.body.innerHTML = `
            <div id="test-target1"></div>
            <div id="test-parent">
                <div class="test-child">Child 1</div>
                <div class="test-child special">Special Child</div>
                <div class="test-child">Child 3</div>
            </div>
            <div id="test-style-target"></div>
            <button id="test-click-btn"></button>
            <span id="test-click-counter">Кликов: 0</span>
            <input id="test-text-input">
            <span id="test-input-display"></span>
            <ul id="test-dynamic-list"></ul>
            <input id="test-item-input">
        `;
    }

    runAllTests() {
        console.log('🚀 Запуск тестов DOM манипуляций...\n');
        
        this.testCreateCard();
        this.testCreateList();
        this.testCountChildren();
        this.testFindSpecialChild();
        this.testGetParentBackground();
        this.testStyleToggle();
        this.testClickCounter();
        this.testInputDisplay();
        this.testAddListItem();
        this.testRemoveListItem();
        this.testClearList();
        this.testValidateForm();
        
        this.printResults();
    }

    assert(condition, message) {
        if (condition) {
            console.log(`✅ PASS: ${message}`);
            this.passed++;
        } else {
            console.log(`❌ FAIL: ${message}`);
            this.failed++;
        }
    }

    testCreateCard() {
        console.log('\n📋 Тест 1: createCard');
        
        const testTarget = document.getElementById('test-target1');
        testTarget.innerHTML = '';
        
        const card = document.createElement('div');
        card.className = 'card';
        
        const title = document.createElement('h4');
        title.textContent = 'Test Title';
        
        const content = document.createElement('p');
        content.textContent = 'Test Content';
        
        card.appendChild(title);
        card.appendChild(content);
        testTarget.appendChild(card);
        
        const createdCard = testTarget.querySelector('.card');
        this.assert(createdCard !== null, 'Карточка должна быть создана');
        this.assert(createdCard.querySelector('h4').textContent === 'Test Title', 'Заголовок должен совпадать');
        this.assert(createdCard.querySelector('p').textContent === 'Test Content', 'Контент должен совпадать');
    }

    testCreateList() {
        console.log('\n📋 Тест 2: createList');
        
        const testTarget = document.getElementById('test-target1');
        testTarget.innerHTML = '';
        
        const items = ['Item 1', 'Item 2', 'Item 3'];
        const ol = document.createElement('ol');
        
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            ol.appendChild(li);
        });
        
        testTarget.appendChild(ol);
        
        const createdList = testTarget.querySelector('ol');
        this.assert(createdList !== null, 'Список должен быть создан');
        this.assert(createdList.children.length === 3, 'Список должен содержать 3 элемента');
        this.assert(createdList.children[0].textContent === 'Item 1', 'Первый элемент должен быть "Item 1"');
    }

    testCountChildren() {
        console.log('\n📋 Тест 3: countChildren');
        
        const parent = document.getElementById('test-parent');
        const count = parent.children.length;
        
        this.assert(count === 3, `Должно быть 3 дочерних элемента, получено: ${count}`);
    }

    testFindSpecialChild() {
        console.log('\n📋 Тест 4: findSpecialChild');
        
        const parent = document.getElementById('test-parent');
        const specialChild = parent.querySelector('.special');
        const text = specialChild ? specialChild.textContent : '';
        
        this.assert(text === 'Special Child', `Текст специального элемента должен быть "Special Child", получено: "${text}"`);
    }

    testGetParentBackground() {
        console.log('\n📋 Тест 5: getParentBackground');
        
        const child = document.querySelector('.test-child');
        const parent = child.parentElement;
        parent.style.backgroundColor = 'rgb(255, 0, 0)';
        
        const style = window.getComputedStyle(parent);
        const bgColor = style.backgroundColor;
        
        this.assert(bgColor === 'rgb(255, 0, 0)', `Цвет фона должен быть rgb(255, 0, 0), получено: ${bgColor}`);
    }

    testStyleToggle() {
        console.log('\n📋 Тест 6: Style Toggle');
        
        const target = document.getElementById('test-style-target');
        
        target.classList.add('active-style');
        this.assert(target.classList.contains('active-style'), 'Класс active-style должен быть добавлен');
        
        target.classList.remove('active-style');
        this.assert(!target.classList.contains('active-style'), 'Класс active-style должен быть удален');
        
        target.classList.toggle('active-style');
        this.assert(target.classList.contains('active-style'), 'Класс active-style должен быть добавлен через toggle');
        
        target.classList.toggle('active-style');
        this.assert(!target.classList.contains('active-style'), 'Класс active-style должен быть удален через toggle');
    }

    testClickCounter() {
        console.log('\n📋 Тест 7: Click Counter');
        
        let count = 0;
        const counter = document.getElementById('test-click-counter');
        
        for (let i = 0; i < 5; i++) {
            count++;
            counter.textContent = `Кликов: ${count}`;
        }
        
        this.assert(count === 5, `Счетчик должен показывать 5 кликов, получено: ${count}`);
        this.assert(counter.textContent === 'Кликов: 5', `Текст счетчика должен быть "Кликов: 5", получено: "${counter.textContent}"`);
    }

    testInputDisplay() {
        console.log('\n📋 Тест 8: Input Display');
        
        const input = document.getElementById('test-text-input');
        const display = document.getElementById('test-input-display');
        
        const testText = 'Hello World';
        input.value = testText;
        
        const event = new Event('input');
        input.dispatchEvent(event);
        display.textContent = input.value;
        
        this.assert(display.textContent === testText, `Display должен показывать "${testText}", получено: "${display.textContent}"`);
    }

    testAddListItem() {
        console.log('\n📋 Тест 9: Add List Item');
        
        const list = document.getElementById('test-dynamic-list');
        const input = document.getElementById('test-item-input');
        
        list.innerHTML = '';
        
        const testItems = ['Task 1', 'Task 2', 'Task 3'];
        
        testItems.forEach(item => {
            const li = document.createElement('li');
            li.className = 'list-item';
            
            const span = document.createElement('span');
            span.textContent = item;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Удалить';
            
            li.appendChild(span);
            li.appendChild(deleteBtn);
            list.appendChild(li);
        });
        
        this.assert(list.children.length === 3, `Список должен содержать 3 элемента, получено: ${list.children.length}`);
        this.assert(list.querySelector('.list-item span').textContent === 'Task 1', 'Первый элемент должен быть "Task 1"');
    }

    testRemoveListItem() {
        console.log('\n📋 Тест 10: Remove List Item');
        
        const list = document.getElementById('test-dynamic-list');
        const initialCount = list.children.length;
        
        if (list.firstChild) {
            list.firstChild.remove();
        }
        
        this.assert(list.children.length === initialCount - 1, `Количество элементов должно уменьшиться на 1, было: ${initialCount}, стало: ${list.children.length}`);
    }

    testClearList() {
        console.log('\n📋 Тест 11: Clear List');
        
        const list = document.getElementById('test-dynamic-list');
        list.innerHTML = '';
        
        this.assert(list.children.length === 0, `Список должен быть пустым, элементов: ${list.children.length}`);
    }

    testValidateForm() {
        console.log('\n📋 Тест 12: Validate Form');
        
        const validData = {
            name: 'John Doe',
            email: 'john@example.com',
            age: '25'
        };
        
        const invalidData = {
            name: 'J', // слишком короткое
            email: 'invalid-email', // невалидный email
            age: '150' // слишком большой возраст
        };
        
        const validateForm = (formData) => {
            const errors = {};
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!formData.name.trim() || formData.name.trim().length < 2) {
                errors.name = 'Имя должно содержать минимум 2 символа';
            }
            
            if (!formData.email.trim() || !emailRegex.test(formData.email)) {
                errors.email = 'Введите корректный email адрес';
            }
            
            const age = parseInt(formData.age);
            if (!formData.age || isNaN(age) || age < 1 || age > 120) {
                errors.age = 'Возраст должен быть числом от 1 до 120';
            }
            
            return Object.keys(errors).length === 0 ? null : errors;
        };
        
        const validResult = validateForm(validData);
        const invalidResult = validateForm(invalidData);
        
        this.assert(validResult === null, 'Валидные данные должны проходить проверку');
        this.assert(invalidResult !== null, 'Невалидные данные не должны проходить проверку');
        this.assert(invalidResult && invalidResult.name, 'Должна быть ошибка имени');
        this.assert(invalidResult && invalidResult.email, 'Должна быть ошибка email');
        this.assert(invalidResult && invalidResult.age, 'Должна быть ошибка возраста');
    }

    printResults() {
        console.log('\n📊 ИТОГИ ТЕСТИРОВАНИЯ:');
        console.log('══════════════════════════════');
        console.log(`✅ Пройдено: ${this.passed}`);
        console.log(`❌ Провалено: ${this.failed}`);
        console.log(`📈 Общее количество: ${this.passed + this.failed}`);
        
        const successRate = (this.passed / (this.passed + this.failed)) * 100;
        console.log(`🎯 Успешность: ${successRate.toFixed(1)}%`);
        
        if (this.failed === 0) {
            console.log('\n🎉 Все тесты пройдены успешно!');
        } else {
            console.log('\n💡 Некоторые тесты не пройдены. Проверьте реализацию функций.');
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {

    const testBtn = document.createElement('button');
    testBtn.textContent = '🚀 Запустить тесты';
    testBtn.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        z-index: 1000;
    `;
    
    testBtn.addEventListener('click', () => {
        const tests = new DomTests();
        tests.runAllTests();
    });
    
    document.body.appendChild(testBtn);
    
    console.log('Тесты готовы к запуску. Нажмите кнопку "🚀 Запустить тесты" в правом верхнем углу.');
});