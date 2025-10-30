import React, { useReducer, useContext, useCallback, useMemo, useRef, memo } from 'react';

// Контекст
const ThemeContext = React.createContext();

// Редуктор для useReducer
const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    case 'SET':
      return { count: action.payload };
    default:
      return state;
  }
};

// Мемоизированный компонент
const ExpensiveComponent = memo(({ value, onCalculate }) => {
  console.log('ExpensiveComponent перерендерен');
  return (
    <div style={{ margin: '10px', padding: '10px', border: '1px solid blue' }}>
      <p>Результат: {onCalculate(value)}</p>
      <p>Значение: {value}</p>
    </div>
  );
});

const AdvancedHooks = () => {
  // useReducer
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  // useContext
  const theme = useContext(ThemeContext);

  // useRef
  const inputRef = useRef(null);
  const renderCount = useRef(0);
  renderCount.current++;

  // useCallback
  const calculateSquare = useCallback((num) => {
    console.log('Вычисление квадрата...');
    return num * num;
  }, []);

  // useMemo
  const expensiveValue = useMemo(() => {
    console.log('Выполнение дорогих вычислений...');
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += i;
    }
    return result + state.count;
  }, [state.count]);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  const handleSetCount = () => {
    const value = parseInt(inputRef.current.value) || 0;
    dispatch({ type: 'SET', payload: value });
  };

  return (
    <div style={{ 
      padding: '20px', 
      border: '1px solid #ccc', 
      margin: '10px',
      backgroundColor: theme.background,
      color: theme.text
    }}>
      <h2>Продвинутые хуки</h2>

      <div>
        <h3>useReducer</h3>
        <p>Счетчик: {state.count}</p>
        <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
        <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
        <button onClick={() => dispatch({ type: 'RESET' })}>Сброс</button>
      </div>

      <div>
        <h3>useRef</h3>
        <p>Количество рендеров: {renderCount.current}</p>
        <input 
          ref={inputRef} 
          type="number" 
          placeholder="Введите число"
        />
        <button onClick={handleFocus}>Фокус на input</button>
        <button onClick={handleSetCount}>Установить счетчик</button>
      </div>

      <div>
        <h3>useMemo</h3>
        <p>Результат дорогих вычислений: {expensiveValue}</p>
      </div>

      <div>
        <h3>useCallback и memo</h3>
        <ExpensiveComponent value={state.count} onCalculate={calculateSquare} />
      </div>

      <div>
        <h3>useContext</h3>
        <p>Текущая тема: {theme.name}</p>
      </div>
    </div>
  );
};

// Компонент-обертка для предоставления контекста
const AdvancedHooksWithProvider = () => {
  const theme = {
    background: '#f0f0f0',
    text: '#333',
    name: 'Светлая тема'
  };

  return (
    <ThemeContext.Provider value={theme}>
      <AdvancedHooks />
    </ThemeContext.Provider>
  );
};

export default AdvancedHooksWithProvider;