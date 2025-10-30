import React, { Component } from 'react';
import './StatefulComponents.css';

// ЗАДАНИЕ 3: Классовые компоненты с состоянием

// 3.1. Компонент Counter
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  decrement = () => {
    this.setState({ count: this.state.count - 1 });
  };

  reset = () => {
    this.setState({ count: 0 });
  };

  render() {
    return (
      <div className="counter">
        <h3>Счетчик: {this.state.count}</h3>
        <div className="counter-buttons">
          <button onClick={this.decrement} className="btn btn-secondary">-</button>
          <button onClick={this.reset} className="btn btn-secondary">Сброс</button>
          <button onClick={this.increment} className="btn btn-primary">+</button>
        </div>
      </div>
    );
  }
}

// 3.2. Компонент LoginForm
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  }

  validateForm = () => {
    const { email, password } = this.state;
    const errors = {};

    if (!email) {
      errors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Некорректный email';
    }

    if (!password) {
      errors.password = 'Пароль обязателен';
    } else if (password.length < 6) {
      errors.password = 'Пароль должен быть не менее 6 символов';
    }

    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validateForm();

    if (Object.keys(errors).length === 0) {
      alert('Форма отправлена успешно!');
      this.setState({ email: '', password: '', errors: {} });
    } else {
      this.setState({ errors });
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      errors: {
        ...this.state.errors,
        [e.target.name]: ''
      }
    });
  };

  render() {
    const { email, password, errors } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="login-form">
        <h3>Форма входа</h3>
        
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Пароль:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            className={errors.password ? 'error' : ''}
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <button type="submit" className="btn btn-primary">Войти</button>
      </form>
    );
  }
}

// 3.3. Компонент ColorPicker
class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedColor: null,
      colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD']
    };
  }

  handleColorSelect = (color) => {
    this.setState({ selectedColor: color });
  };

  render() {
    const { selectedColor, colors } = this.state;

    return (
      <div className="color-picker">
        <h3>Выбор цвета</h3>
        <div className="color-preview" style={{ 
          backgroundColor: selectedColor || '#f0f0f0',
          color: selectedColor ? 'white' : 'black'
        }}>
          {selectedColor ? `Выбран цвет: ${selectedColor}` : 'Выберите цвет'}
        </div>
        <div className="color-options">
          {colors.map((color, index) => (
            <div
              key={index}
              className="color-option"
              style={{ backgroundColor: color }}
              onClick={() => this.handleColorSelect(color)}
            />
          ))}
        </div>
      </div>
    );
  }
}

// ЗАДАНИЕ 4: Обработка событий и формы

// 4.1. Компонент TodoList
class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: ''
    };
  }

  handleInputChange = (e) => {
    this.setState({ newTodo: e.target.value });
  };

  addTodo = () => {
    const { newTodo, todos } = this.state;
    if (newTodo.trim()) {
      this.setState({
        todos: [...todos, { id: Date.now(), text: newTodo, completed: false }],
        newTodo: ''
      });
    }
  };

  toggleTodo = (id) => {
    this.setState({
      todos: this.state.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    });
  };

  deleteTodo = (id) => {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    });
  };

  render() {
    const { todos, newTodo } = this.state;

    return (
      <div className="todo-list">
        <h3>Список задач</h3>
        
        <div className="todo-input">
          <input
            type="text"
            value={newTodo}
            onChange={this.handleInputChange}
            placeholder="Новая задача..."
            onKeyPress={(e) => e.key === 'Enter' && this.addTodo()}
          />
          <button onClick={this.addTodo} className="btn btn-primary">Добавить</button>
        </div>

        <ul className="todo-items">
          {todos.map(todo => (
            <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <span onClick={() => this.toggleTodo(todo.id)}>
                {todo.text}
              </span>
              <button 
                onClick={() => this.deleteTodo(todo.id)}
                className="btn btn-secondary btn-small"
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

// 4.2. Компонент SearchBox
class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: [],
      allItems: ['React', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Node.js', 'Vue', 'Angular']
    };
  }

  handleSearch = (e) => {
    const query = e.target.value;
    this.setState({ query });

    if (query.trim()) {
      const results = this.state.allItems.filter(item =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      this.setState({ results });
    } else {
      this.setState({ results: [] });
    }
  };

  clearSearch = () => {
    this.setState({ query: '', results: [] });
  };

  render() {
    const { query, results } = this.state;

    return (
      <div className="search-box">
        <h3>Поиск</h3>
        
        <div className="search-input">
          <input
            type="text"
            value={query}
            onChange={this.handleSearch}
            placeholder="Введите запрос..."
          />
          {query && (
            <button onClick={this.clearSearch} className="btn btn-secondary">
              Очистить
            </button>
          )}
        </div>

        {results.length > 0 && (
          <ul className="search-results">
            {results.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        )}

        {query && results.length === 0 && (
          <p className="no-results">Ничего не найдено</p>
        )}
      </div>
    );
  }
}

export {
  Counter,
  LoginForm,
  ColorPicker,
  TodoList,
  SearchBox
};