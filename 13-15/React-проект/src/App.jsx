import React from 'react';
import './App.css';

// Импорт базовых компонентов
import {
  WelcomeMessage,
  UserCard,
  Button,
  Card,
  Toggle,
  ConditionalMessage
} from './components/basic/BasicComponents';

// Импорт компонентов с состоянием
import {
  Counter,
  LoginForm,
  ColorPicker,
  TodoList,
  SearchBox
} from './components/stateful/StatefulComponents';

// Импорт компонентов жизненного цикла
import {
  Timer,
  WindowSizeTracker,
  DataFetcher
} from './components/lifecycle/LifecycleComponents';

// Импорт компонентов с хуками
import {
  CounterWithHooks,
  UserProfile,
  EffectDemo,
  LocalStorageDemo,
  FetchDemo,
  ThemeProvider,
  ThemeToggle,
  ThemedComponent
} from './components/hooks/HooksComponents';

function App() {
  // Пример пользователя для UserCard
  const exampleUser = {
    name: 'Иван Иванов',
    email: 'ivan@example.com',
    avatar: 'https://via.placeholder.com/50',
    isOnline: true
  };

  // Обработчик для кнопки
  const handleButtonClick = () => {
    alert('Кнопка нажата!');
  };

  return (
    <ThemeProvider>
      <div className="App">
        <header className="App-header">
          <h1>Практическая работа №15: React компоненты</h1>
          <p>Изучение функциональных и классовых компонентов, состояния, событий и хуков</p>
        </header>

        <main className="App-main">
          {/* Раздел 1: Базовые компоненты */}
          <section className="section">
            <h2>Часть 1: Базовые компоненты</h2>
            
            <div className="components-grid">
              <Card title="WelcomeMessage">
                <WelcomeMessage name="Анна" age={25} />
              </Card>

              <Card title="UserCard">
                <UserCard user={exampleUser} />
              </Card>

              <Card title="Button">
                <Button variant="primary" size="medium" onClick={handleButtonClick}>
                  Основная кнопка
                </Button>
                <Button variant="secondary" size="small">
                  Вторичная кнопка
                </Button>
              </Card>

              <Card title="Toggle">
                <Toggle>
                  <p>Это скрытое содержимое, которое можно показать или скрыть!</p>
                </Toggle>
              </Card>

              <Card title="ConditionalMessage">
                <ConditionalMessage status="success" message="Операция выполнена успешно!" />
                <ConditionalMessage status="error" message="Произошла ошибка!" />
                <ConditionalMessage status="warning" message="Внимание: это предупреждение!" />
              </Card>
            </div>
          </section>

          {/* Раздел 2: Компоненты с состоянием */}
          <section className="section">
            <h2>Часть 2: Компоненты с состоянием</h2>
            
            <div className="components-grid">
              <Card title="Counter">
                <Counter />
              </Card>

              <Card title="LoginForm">
                <LoginForm />
              </Card>

              <Card title="ColorPicker">
                <ColorPicker />
              </Card>

              <Card title="TodoList">
                <TodoList />
              </Card>

              <Card title="SearchBox">
                <SearchBox />
              </Card>
            </div>
          </section>

          {/* Раздел 3: Жизненный цикл */}
          <section className="section">
            <h2>Часть 3: Жизненный цикл</h2>
            
            <div className="components-grid">
              <Card title="Timer">
                <Timer />
              </Card>

              <Card title="WindowSizeTracker">
                <WindowSizeTracker />
              </Card>

              <Card title="DataFetcher">
                <DataFetcher />
              </Card>
            </div>
          </section>

          {/* Раздел 4: Хуки */}
          <section className="section">
            <h2>Часть 4: React Hooks</h2>
            
            <div className="components-grid">
              <Card title="CounterWithHooks">
                <CounterWithHooks />
              </Card>

              <Card title="UserProfile">
                <UserProfile />
              </Card>

              <Card title="EffectDemo">
                <EffectDemo />
              </Card>

              <Card title="LocalStorageDemo">
                <LocalStorageDemo />
              </Card>

              <Card title="FetchDemo">
                <FetchDemo />
              </Card>

              <Card title="ThemeToggle">
                <ThemeToggle />
                <ThemedComponent />
              </Card>
            </div>
          </section>

          {/* Раздел 5: Демонстрация всех компонентов вместе */}
          <section className="section">
            <h2>Демонстрация взаимодействия</h2>
            
            <div className="demo-area">
              <Card title="Комплексный пример">
                <div className="complex-demo">
                  <WelcomeMessage name="Демо пользователь" age={30} />
                  
                  <div className="demo-controls">
                    <Button variant="primary" onClick={handleButtonClick}>
                      Тестовая кнопка
                    </Button>
                    
                    <Toggle>
                      <div className="toggle-content">
                        <UserCard user={exampleUser} />
                        <ConditionalMessage status="success" message="Это демонстрация!" />
                      </div>
                    </Toggle>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        </main>

        <footer className="App-footer">
          <p>Практическая работа выполнена в рамках изучения React</p>
          <p>Все компоненты созданы согласно требованиям задания</p>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;