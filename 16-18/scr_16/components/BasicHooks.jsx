import React, { useState, useEffect } from 'react';

const BasicHooks = () => {
  // useState
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  // useEffect
  useEffect(() => {
    document.title = `Счетчик: ${count}`;
    
    return () => {
      document.title = 'React App';
    };
  }, [count]);

  useEffect(() => {
    console.log('Компонент смонтирован');
    
    return () => {
      console.log('Компонент размонтирован');
    };
  }, []);

  useEffect(() => {
    console.log(`Имя изменено на: ${name}`);
  }, [name]);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const toggleVisibility = () => setIsVisible(prev => !prev);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h2>Базовые хуки</h2>
      
      <div>
        <h3>useState</h3>
        <p>Счетчик: {count}</p>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
        
        <p>Имя: {name}</p>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите имя"
        />
        
        <p>Видимость: {isVisible ? 'Видно' : 'Скрыто'}</p>
        <button onClick={toggleVisibility}>
          {isVisible ? 'Скрыть' : 'Показать'}
        </button>
      </div>

      <div>
        <h3>useEffect</h3>
        <p>Заголовок страницы изменяется при изменении счетчика</p>
        <p>Проверьте консоль для просмотра эффектов</p>
      </div>
    </div>
  );
};

export default BasicHooks;