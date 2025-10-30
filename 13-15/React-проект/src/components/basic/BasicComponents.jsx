import React from 'react';
import './BasicComponents.css';

// ЗАДАНИЕ 1: Функциональный компонент с props

// 1.1. Компонент WelcomeMessage
const WelcomeMessage = ({ name, age }) => {
  return (
    <div className="welcome-message">
      <h2>Добро пожаловать, {name}!</h2>
      <p>Ваш возраст: {age} лет</p>
    </div>
  );
};

// 1.2. Компонент UserCard
const UserCard = ({ user }) => {
  const { name, email, avatar, isOnline } = user;
  
  return (
    <div className={`user-card ${isOnline ? 'online' : 'offline'}`}>
      <img src={avatar} alt={name} className="user-avatar" />
      <div className="user-info">
        <h3>{name}</h3>
        <p>{email}</p>
        <span className="status">{isOnline ? 'В сети' : 'Не в сети'}</span>
      </div>
    </div>
  );
};

// 1.3. Компонент Button
const Button = ({ variant = 'primary', size = 'medium', onClick, children }) => {
  const buttonClass = `btn btn-${variant} btn-${size}`;
  
  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

// ЗАДАНИЕ 2: Работа с children и условный рендеринг

// 2.1. Компонент Card
const Card = ({ title, children }) => {
  return (
    <div className="card">
      {title && <h3 className="card-title">{title}</h3>}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

// 2.2. Компонент Toggle
const Toggle = ({ children }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  
  return (
    <div className="toggle">
      <Button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Скрыть' : 'Показать'}
      </Button>
      {isVisible && <div className="toggle-content">{children}</div>}
    </div>
  );
};

// 2.3. Компонент ConditionalMessage
const ConditionalMessage = ({ status, message }) => {
  const getStatusClass = () => {
    switch (status) {
      case 'success':
        return 'message-success';
      case 'error':
        return 'message-error';
      case 'warning':
        return 'message-warning';
      default:
        return 'message-default';
    }
  };
  
  const getStatusText = () => {
    switch (status) {
      case 'success':
        return 'Успех!';
      case 'error':
        return 'Ошибка!';
      case 'warning':
        return 'Предупреждение!';
      default:
        return 'Информация';
    }
  };
  
  return (
    <div className={`message ${getStatusClass()}`}>
      <strong>{getStatusText()}</strong> {message}
    </div>
  );
};

// Экспорт всех компонентов
export {
  WelcomeMessage,
  UserCard,
  Button,
  Card,
  Toggle,
  ConditionalMessage
};