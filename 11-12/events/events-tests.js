// Тесты для проверки обработки событий

class EventTests {
    constructor() {
        this.passed = 0;
        this.failed = 0;
        this.setupTestEnvironment();
    }

    setupTestEnvironment() {
        // Создаем тестовый DOM
        document.body.innerHTML += `
            <div id="test-area" style="display: none;">
                <button id="test-basic-btn">Тест кнопка</button>
                <div id="test-basic-output"></div>
                
                <div id="test-color-box"></div>
                <div id="test-mouse-output"></div>
                
                <input id="test-key-input">
                <div id="test-key-output"></div>
                
                <ul id="test-item-list">
                    <li class="item" data-id="1">Элемент 1</li>
                </ul>
                <div id='