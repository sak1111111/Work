import React, { useState, useEffect, useContext, createContext } from 'react';
import './HooksComponents.css';

// ЗАДАНИЕ 6: Хуки useState и useEffect

// 6.1. Компонент CounterWithHooks
const CounterWithHooks = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="counter-hooks">
      <h3>Счетчик с хуками: {count}</h3>
      <div className="counter-buttons">
        <button onClick={() => setCount(count - 1)} className="btn btn-secondary">
          -
        </button>
        <button onClick={() => setCount(0)} className="btn btn-secondary">
          Сброс
        </button>
        <button onClick={() => setCount(count + 1)} className="btn btn-primary">
          +
        </button>
      </div>
    </div>
  );
};

// 6.2. Компонент UserProfile
const UserProfile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: '',
    bio: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Профиль сохранен!');
  };

  return (
    <form onSubmit={handleSubmit} className="user-profile">
      <h3>Редактирование профиля</h3>
      
      <div className="form-group">
        <label>Имя:</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Возраст:</label>
        <input
          type="number"
          name="age"
          value={user.age}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Биография:</label>
        <textarea
          name="bio"
          value={user.bio}
          onChange={handleChange}
          rows="4"
        />
      </div>

      <button type="submit" className="btn btn-primary">Сохранить</button>
    </form>
  );
};

// 6.3. Компонент EffectDemo
const EffectDemo = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // useEffect без зависимостей (componentDidMount + componentDidUpdate)
  useEffect(() => {
    console.log('Компонент смонтирован или обновлен');
  });

  // useEffect с пустым массивом зависимостей (только componentDidMount)
  useEffect(() => {
    console.log('Компонент смонтирован');
    
    return () => {
      console.log('Компонент будет размонтирован');
    };
  }, []);

  // useEffect с зависимостями
  useEffect(() => {
    console.log(`Count изменился: ${count}`);
  }, [count]);

  useEffect(() => {
    console.log(`Name изменился: ${name}`);
  }, [name]);

  return (
    <div className="effect-demo">
      <h3>Демонстрация useEffect</h3>
      <p>Счетчик: {count}</p>
      <button onClick={() => setCount(count + 1)} className="btn btn-primary">
        Увеличить счетчик
      </button>
      
      <div className="form-group">
        <label>Имя:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите имя"
        />
      </div>
      
      <p>Откройте консоль для просмотра эффектов</p>
    </div>
  );
};

// ЗАДАНИЕ 7: Кастомные хуки и useContext

// 7.1. Кастомный хук useLocalStorage
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Ошибка чтения localStorage ключа "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Ошибка записи в localStorage ключа "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

// Компонент с использованием useLocalStorage
const LocalStorageDemo = () => {
  const [name, setName] = useLocalStorage('userName', '');
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <div className="local-storage-demo">
      <h3>Демонстрация useLocalStorage</h3>
      
      <div className="form-group">
        <label>Имя пользователя:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите имя"
        />
        <p>Сохраненное имя: {name}</p>
      </div>

      <div className="form-group">
        <label>Тема:</label>
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="light">Светлая</option>
          <option value="dark">Темная</option>
          <option value="blue">Синяя</option>
        </select>
        <p>Выбранная тема: {theme}</p>
      </div>
    </div>
  );
};

// 7.2. Кастомный хук useFetch
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Ошибка загрузки данных');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

// Компонент с использованием useFetch
const FetchDemo = () => {
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/users/1');

  return (
    <div className="fetch-demo">
      <h3>Демонстрация useFetch</h3>
      
      {loading && <p>Загрузка...</p>}
      {error && <p className="error">Ошибка: {error}</p>}
      {data && (
        <div className="user-data">
          <h4>Данные пользователя:</h4>
          <p><strong>Имя:</strong> {data.name}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Телефон:</strong> {data.phone}</p>
        </div>
      )}
    </div>
  );
};

// 7.3. Компонент ThemeToggle с использованием useContext

// Создание Context для темы
const ThemeContext = createContext();

// Провайдер темы
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`theme-wrapper ${theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// Компонент для переключения темы
const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="theme-toggle">
      <h3>Переключение темы</h3>
      <p>Текущая тема: {theme === 'light' ? 'Светлая' : 'Темная'}</p>
      <button onClick={toggleTheme} className="btn btn-primary">
        Переключить на {theme === 'light' ? 'темную' : 'светлую'} тему
      </button>
    </div>
  );
};

// Демонстрационный компонент, использующий тему
const ThemedComponent = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="themed-component">
      <h3>Компонент с темой</h3>
      <p>Этот компонент использует текущую тему: {theme}</p>
      <div className="theme-box">
        Содержимое в стиле текущей темы
      </div>
    </div>
 