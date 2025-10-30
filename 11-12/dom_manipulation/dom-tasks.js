// ЗАДАНИЕ 1: Создание и вставка элементов

function createCard(title, content) {
    const card = document.createElement('div');
    card.className = 'card';
    
    const cardTitle = document.createElement('h4');
    cardTitle.textContent = title;
    
    const cardContent = document.createElement('p');
    cardContent.textContent = content;
    
    card.appendChild(cardTitle);
    card.appendChild(cardContent);
    
    const target = document.getElementById('target1');
    target.appendChild(card);
}

function createList(items) {
    const ol = document.createElement('ol');
    
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ol.appendChild(li);
    });
    
    const target = document.getElementById('target1');
    target.appendChild(ol);
}

// ЗАДАНИЕ 2: Навигация по DOM

function countChildren() {
    const parent = document.getElementById('parent-element');
    return parent.children.length;
}

function findSpecialChild() {
    const parent = document.getElementById('parent-element');
    const specialChild = parent.querySelector('.special');
    return specialChild ? specialChild.textContent : 'Элемент не найден';
}

function getParentBackground() {
    const child = document.querySelector('.child');
    const parent = child.parentElement;
    const style = window.getComputedStyle(parent);
    return style.backgroundColor;
}

// ЗАДАНИЕ 3: Работа с классами и стилями

function setupStyleToggle() {
    const toggleBtn = document.getElementById('toggle-style-btn');
    const target = document.getElementById('style-target');
    
    toggleBtn.addEventListener('click', () => {
        target.classList.toggle('active-style');
    });
}

function changeHeaderColor() {
    const header = document.getElementById('main-header');
    const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    header.style.background = `linear-gradient(135deg, ${randomColor} 0%, #764ba2 100%)`;
}

function animateElement() {
    const element = document.getElementById('style-target');
    element.classList.add('animated');
    
    setTimeout(() => {
        element.classList.remove('animated');
    }, 1000);
}

// ЗАДАНИЕ 4: Обработка событий

function setupClickCounter() {
    let count = 0;
    const clickBtn = document.getElementById('click-btn');
    const counter = document.getElementById('click-counter');
    
    clickBtn.addEventListener('click', () => {
        count++;
        counter.textContent = `Кликов: ${count}`;
    });
}

function setupInputDisplay() {
    const input = document.getElementById('text-input');
    const display = document.getElementById('input-display');
    
    input.addEventListener('input', (event) => {
        display.textContent = event.target.value;
    });
}

function setupKeyboardEvents() {
    document.addEventListener('keydown', (event) => {
        console.log(`Key Down - Code: ${event.code}, Key: ${event.key}`);
    });
    
    document.addEventListener('keyup', (event) => {
        console.log(`Key Up - Code: ${event.code}, Key: ${event.key}`);
    });
}

// ЗАДАНИЕ 5: Динамические списки

function addListItem() {
    const input = document.getElementById('item-input');
    const list = document.getElementById('dynamic-list');
    
    if (input.value.trim() === '') {
        alert('Введите текст элемента');
        return;
    }
    
    const li = document.createElement('li');
    li.className = 'list-item';
    
    const span = document.createElement('span');
    span.textContent = input.value;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Удалить';
    deleteBtn.addEventListener('click', removeListItem);
    
    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);
    
    input.value = '';
}

function removeListItem(event) {
    if (event.target.tagName === 'BUTTON') {
        const li = event.target.closest('.list-item');
        if (li) {
            li.remove();
        }
    }
}

function clearList() {
    const list = document.getElementById('dynamic-list');
    list.innerHTML = '';
}

function setupListEvents() {
    const addBtn = document.getElementById('add-item-btn');
    const clearBtn = document.getElementById('clear-list-btn');
    const list = document.getElementById('dynamic-list');
    
    addBtn.addEventListener('click', addListItem);
    clearBtn.addEventListener('click', clearList);
    
    list.addEventListener('click', removeListItem);
}

// ЗАДАНИЕ 6: Работа с формами

function validateForm(formData) {
    const errors = {};
    
    // Проверка имени
    if (!formData.name.trim()) {
        errors.name = 'Имя обязательно для заполнения';
    } else if (formData.name.trim().length < 2) {
        errors.name = 'Имя должно содержать минимум 2 символа';
    }
    
    // Проверка email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
        errors.email = 'Email обязателен для заполнения';
    } else if (!emailRegex.test(formData.email)) {
        errors.email = 'Введите корректный email адрес';
    }
    
    // Проверка возраста
    const age = parseInt(formData.age);
    if (!formData.age) {
        errors.age = 'Возраст обязателен для заполнения';
    } else if (isNaN(age) || age < 1 || age > 120) {
        errors.age = 'Возраст должен быть числом от 1 до 120';
    }
    
    return Object.keys(errors).length === 0 ? null : errors;
}

function displayFormErrors(errors) {
    const output = document.getElementById('form-output');
    output.innerHTML = '';
    
    Object.values(errors).forEach(error => {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = error;
        output.appendChild(errorElement);
    });
}

function displayFormSuccess(userData) {
    const output = document.getElementById('form-output');
    output.innerHTML = '';
    
    const successElement = document.createElement('div');
    successElement.className = 'success-message';
    
    successElement.innerHTML = `
        <h3>✅ Форма успешно отправлена!</h3>
        <p><strong>Имя:</strong> ${userData.name}</p>
        <p><strong>Email:</strong> ${userData.email}</p>
        <p><strong>Возраст:</strong> ${userData.age}</p>
    `;
    
    output.appendChild(successElement);
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        age: document.getElementById('age').value
    };
    
    const errors = validateForm(formData);
    
    if (errors) {
        displayFormErrors(errors);
    } else {
        displayFormSuccess(formData);
        event.target.reset();
    }
}

function setupForm() {
    const form = document.getElementById('user-form');
    form.addEventListener('submit', handleFormSubmit);
}

document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('create-card-btn').addEventListener('click', () => {
        createCard('Пример карточки', 'Это содержимое карточки, созданной динамически');
    });
    
    document.getElementById('create-list-btn').addEventListener('click', () => {
        createList(['Элемент 1', 'Элемент 2', 'Элемент 3', 'Элемент 4']);
    });
    
    document.getElementById('count-children-btn').addEventListener('click', () => {
        const count = countChildren();
        document.getElementById('dom-results').textContent = `Количество дочерних элементов: ${count}`;
    });
    
    document.getElementById('find-special-btn').addEventListener('click', () => {
        const text = findSpecialChild();
        document.getElementById('dom-results').textContent = `Специальный элемент: "${text}"`;
    });
    
    document.getElementById('get-parent-bg-btn').addEventListener('click', () => {
        const bgColor = getParentBackground();
        document.getElementById('dom-results').textContent = `Цвет фона родителя: ${bgColor}`;
    });
    
    document.getElementById('change-header-btn').addEventListener('click', changeHeaderColor);
    document.getElementById('animate-btn').addEventListener('click', animateElement);
    
    setupStyleToggle();
    setupClickCounter();
    setupInputDisplay();
    setupKeyboardEvents();
    setupListEvents();
    setupForm();
    
    console.log('Все обработчики событий инициализированы');
});