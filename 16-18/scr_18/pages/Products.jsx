import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Имитация загрузки данных с API
  useEffect(() => {
    const mockProducts = [
      {
        id: 1,
        name: 'Смартфон Samsung Galaxy S23',
        price: 79990,
        category: 'Электроника',
        description: 'Флагманский смартфон с лучшей камерой'
      },
      {
        id: 2,
        name: 'Ноутбук Apple MacBook Air',
        price: 119990,
        category: 'Электроника',
        description: 'Мощный и легкий ноутбук для работы и творчества'
      },
      {
        id: 3,
        name: 'Кофемашина DeLonghi',
        price: 45990,
        category: 'Бытовая техника',
        description: 'Автоматическая кофемашина для идеального кофе'
      },
      {
        id: 4,
        name: 'Беспроводные наушники Sony',
        price: 29990,
        category: 'Электроника',
        description: 'Наушники с шумоподавлением и отличным звуком'
      },
      {
        id: 5,
        name: 'Умные часы Apple Watch',
        price: 35990,
        category: 'Электроника',
        description: 'Умные часы для здоровья и продуктивности'
      },
      {
        id: 6,
        name: 'Пылесос Dyson V11',
        price: 52990,
        category: 'Бытовая техника',
        description: 'Мощный беспроводной пылесос для дома'
      }
    ];

    // Имитация задержки загрузки
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="page">
        <h1>Наши товары</h1>
        <div className="loading">
          <div className="spinner"></div>
          <p>Загружаем товары...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Каталог товаров</h1>
      <p>Выберите товар для просмотра подробной информации</p>
      
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div className="price">{product.price.toLocaleString()} ₽</div>
            <p><small>Категория: {product.category}</small></p>
            <Link to={`/products/${product.id}`} className="btn">
              Подробнее
            </Link>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <p>Не нашли то, что искали?</p>
        <Link to="/contact" className="btn btn-secondary">
          Свяжитесь с нами
        </Link>
      </div>
    </div>
  );
};

export default Products;