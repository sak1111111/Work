import React, { useState, useEffect, useCallback } from 'react';

// Кастомный хук для использования localStorage
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
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Ошибка записи в localStorage ключа "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

// Кастомный хук для API запросов
const useApi = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
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

  const refetch = useCallback(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
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

  return { data, loading, error, refetch };
};

// Кастомный хук для отслеживания размера окна
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
};

// Кастомный хук для таймера
const useTimer = (initialTime = 0) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setTime(initialTime);
    setIsRunning(false);
  };

  return { time, isRunning, start, pause, reset };
};

// Компонент, использующий кастомные хуки
const CustomHooks = () => {
  // Использование useLocalStorage
  const [name, setName] = useLocalStorage('userName', '');
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  // Использование useApi
  const { data: user, loading, error, refetch } = useApi('https://jsonplaceholder.typicode.com/users/1');

  // Использование useWindowSize
  const windowSize = useWindowSize();

  // Использование useTimer
  const timer = useTimer(0);

  return (
    <div style={{ 
      padding: '20px', 
      border: '1px solid #ccc', 
      margin: '10px',
      backgroundColor: theme === 'dark' ? '#333' : '#fff',
      color: theme === 'dark' ? '#fff' : '#333'
    }}>
      <h2>Кастомные хуки</h2>

      <div style={{ marginBottom: '20px' }}>
        <h3>useLocalStorage</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите имя (сохраняется в localStorage)"
        />
        <p>Текущее имя: {name}</p>
        
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          Переключить тему ({theme})
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>useApi</h3>
        {loading && <p>Загрузка...</p>}
        {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}
        {user && (
          <div>
            <p>Пользователь: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        )}
        <button onClick={refetch} disabled={loading}>
          Перезагрузить данные
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>useWindowSize</h3>
        <p>Ширина окна: {windowSize.width}px</p>
        <p>Высота окна: {windowSize.height}px</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>useTimer</h3>
        <p>Время: {timer.time} сек.</p>
        <button onClick={timer.start} disabled={timer.isRunning}>
          Старт
        </button>
        <button onClick={timer.pause} disabled={!timer.isRunning}>
          Пауза
        </button>
        <button onClick={timer.reset}>
          Сброс
        </button>
      </div>
    </div>
  );
};

export default CustomHooks;