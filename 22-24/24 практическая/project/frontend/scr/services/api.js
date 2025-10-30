import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Создаем экземпляр axios с базовой конфигурацией
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Интерцептор для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Сервер ответил с статусом ошибки
      console.error('API Error:', error.response.data);
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // Запрос был сделан, но ответ не получен
      console.error('Network Error:', error.request);
      return Promise.reject({
        message: 'Сетевая ошибка. Проверьте подключение к интернету.'
      });
    } else {
      // Что-то пошло не так при настройке запроса
      console.error('Error:', error.message);
      return Promise.reject({
        message: 'Произошла непредвиденная ошибка'
      });
    }
  }
);

// CRUD операции
export const itemsAPI = {
  // Получить все элементы
  getAll: () => api.get('/items'),
  
  // Получить элемент по ID
  getById: (id) => api.get(`/items/${id}`),
  
  // Создать новый элемент
  create: (itemData) => api.post('/items', itemData),
  
  // Обновить элемент
  update: (id, itemData) => api.put(`/items/${id}`, itemData),
  
  // Удалить элемент
  delete: (id) => api.delete(`/items/${id}`),
};

export default api;