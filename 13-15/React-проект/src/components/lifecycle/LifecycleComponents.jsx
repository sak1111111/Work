import React, { Component } from 'react';
import './LifecycleComponents.css';

// ЗАДАНИЕ 5: Методы жизненного цикла

// 5.1. Компонент Timer
class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      isRunning: false
    };
  }

  componentDidMount() {
    console.log('Timer mounted');
  }

  componentWillUnmount() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
    console.log('Timer unmounted');
  }

  startTimer = () => {
    if (!this.state.isRunning) {
      this.timerId = setInterval(() => {
        this.setState(prevState => ({ time: prevState.time + 1 }));
      }, 1000);
      this.setState({ isRunning: true });
    }
  };

  stopTimer = () => {
    if (this.state.isRunning) {
      clearInterval(this.timerId);
      this.setState({ isRunning: false });
    }
  };

  resetTimer = () => {
    this.setState({ time: 0, isRunning: false });
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  };

  formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  render() {
    const { time, isRunning } = this.state;

    return (
      <div className="timer">
        <h3>Секундомер: {this.formatTime(time)}</h3>
        <div className="timer-controls">
          <button 
            onClick={this.startTimer} 
            disabled={isRunning}
            className="btn btn-primary"
          >
            Старт
          </button>
          <button 
            onClick={this.stopTimer} 
            disabled={!isRunning}
            className="btn btn-secondary"
          >
            Стоп
          </button>
          <button 
            onClick={this.resetTimer}
            className="btn btn-secondary"
          >
            Сброс
          </button>
        </div>
      </div>
    );
  }
}

// 5.2. Компонент WindowSizeTracker
class WindowSizeTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    console.log('WindowSizeTracker mounted');
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    console.log('WindowSizeTracker unmounted');
  }

  handleResize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  render() {
    const { width, height } = this.state;

    return (
      <div className="window-size-tracker">
        <h3>Размер окна браузера</h3>
        <p>Ширина: {width}px</p>
        <p>Высота: {height}px</p>
      </div>
    );
  }
}

// 5.3. Компонент DataFetcher
class DataFetcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: false,
      error: null
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url) {
      this.fetchData();
    }
  }

  fetchData = async () => {
    this.setState({ loading: true, error: null });
    
    try {
      const response = await fetch(this.props.url);
      if (!response.ok) {
        throw new Error('Ошибка загрузки данных');
      }
      const data = await response.json();
      this.setState({ data, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  render() {
    const { data, loading, error } = this.state;

    return (
      <div className="data-fetcher">
        <h3>Загрузка данных</h3>
        {loading && <p>Загрузка...</p>}
        {error && <p className="error">Ошибка: {error}</p>}
        {data && (
          <pre className="data-display">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
        <button onClick={this.fetchData} className="btn btn-primary">
          Обновить данные
        </button>
      </div>
    );
  }
}

DataFetcher.defaultProps = {
  url: 'https://jsonplaceholder.typicode.com/posts/1'
};

export {
  Timer,
  WindowSizeTracker,
  DataFetcher
};