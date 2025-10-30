import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="page" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
      <div style={{ fontSize: '6rem', color: '#bdc3c7', marginBottom: '1rem' }}>404</div>
      <h1 style={{ color: '#2c3e50', marginBottom: '1rem' }}>Страница не найдена</h1>
      <p style={{ fontSize: '1.2rem', color: '#7f8c8d', marginBottom: '2rem' }}>
        Извините, но страница, которую вы ищете, не существует или была перемещена.
      </p>
      
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={() => navigate(-1)} className="btn btn-secondary">
          ← Вернуться назад
        </button>
        <Link to="/" className="btn">
          На главную
        </Link>
        <Link to="/products" className="btn">
          Каталог товаров
        </Link>
        <Link to="/contact" className="btn">
          Контакты
        </Link>
      </div>

      <div style={{ marginTop: '3rem', padding: '2rem', background: '#f8f9fa', borderRadius: '8px' }}>
        <h3>Популярные страницы</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          <Link to="/about" style={{ padding: '1rem', background: 'white', borderRadius: '4px', textDecoration: 'none', color: '#3498db' }}>
            О компании
          </Link>
          <Link to="/products" style={{ padding: '1rem', background: 'white', borderRadius: '4px', textDecoration: 'none', color: '#3498db' }}>
            Все товары
          </Link>
          <Link to="/contact" style={{ padding: '1rem', background: 'white', borderRadius: '4px', textDecoration: 'none', color: '#3498db' }}>
            Связаться с нами
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;