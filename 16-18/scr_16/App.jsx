import React from 'react';
import HooksTests from './components/HooksTests';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Практическая работа №16: React хуки</h1>
        <p>Изучение встроенных и кастомных хуков React</p>
      </header>
      <main>
        <HooksTests />
      </main>
      <footer style={{ 
        textAlign: 'center', 
        padding: '20px', 
        marginTop: '20px',
        borderTop: '1px solid #ccc'
      }}>
        <p>React Hooks Practice - {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;