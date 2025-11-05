// Дополнительный JavaScript для статических страниц
document.addEventListener('DOMContentLoaded', function() {
    console.log('Статическая страница загружена');
    
    // Добавляем интерактивность для статических страниц
    const endpoints = document.querySelectorAll('.endpoint');
    
    endpoints.forEach(endpoint => {
        endpoint.addEventListener('click', function() {
            this.style.backgroundColor = '#e9ecef';
            setTimeout(() => {
                this.style.backgroundColor = '#f8f9fa';
            }, 200);
        });
    });
    
    // Показываем текущее время
    const timeElement = document.createElement('div');
    timeElement.style.textAlign = 'center';
    timeElement.style.marginTop = '20px';
    timeElement.style.padding = '10px';
    timeElement.style.backgroundColor = '#f8f9fa';
    timeElement.style.borderRadius = '5px';
    
    function updateTime() {
        const now = new Date();
        timeElement.textContent = `Текущее время: ${now.toLocaleString('ru-RU')}`;
    }
    
    updateTime();
    setInterval(updateTime, 1000);
    
    const container = document.querySelector('.container');
    if (container) {
        container.appendChild(timeElement);
    }
});

// Функция для тестирования API со статической страницы
async function testAPI(endpoint) {
    try {
        const response = await fetch(`http://localhost:3001${endpoint}`);
        const data = await response.json();
        console.log(`Результат запроса ${endpoint}:`, data);
        alert(`Результат запроса ${endpoint}:\n${JSON.stringify(data, null, 2)}`);
        return data;
    } catch (error) {
        console.error('Ошибка:', error);
        alert(`Ошибка при запросе ${endpoint}: ${error.message}`);
    }
}