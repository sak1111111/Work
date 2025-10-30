import React, { useState } from 'react';
import UserRegistrationForm from './components/UserRegistrationForm';
import UserRegistrationFormWithValidation from './components/UserRegistrationFormWithValidation';
import ContactFormUncontrolled from './components/ContactFormUncontrolled';
import './App.css';

function App() {
  const [activeForm, setActiveForm] = useState('basic');

  const renderForm = () => {
    switch (activeForm) {
      case 'basic':
        return <UserRegistrationForm />;
      case 'validation':
        return <UserRegistrationFormWithValidation />;
      case 'uncontrolled':
        return <ContactFormUncontrolled />;
      default:
        return <UserRegistrationForm />;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Практическая работа №17: React формы</h1>
        <p>Изучение управляемых и неуправляемых компонентов форм</p>
      </header>
      
      <nav className="form-navigation">
        <button 
          className={activeForm === 'basic' ? 'active' : ''}
          onClick={() => setActiveForm('basic')}
        >
          Базовая форма
        </button>
        <button 
          className={activeForm === 'validation' ? 'active' : ''}
          onClick={() => setActiveForm('validation')}
        >
          Форма с валидацией
        </button>
        <button 
          className={activeForm === 'uncontrolled' ? 'active' : ''}
          onClick={() => setActiveForm('uncontrolled')}
        >
          Неуправляемая форма
        </button>
      </nav>

      <main>
        {renderForm()}
      </main>

      <footer className="App-footer">
        <p>React Forms Practice - {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;