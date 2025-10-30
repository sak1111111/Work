import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Имитация загрузки данных товара
  useEffect(() => {
    const mockProducts = {
      1: {
        id: 1,
        name: 'Смартфон Samsung Galaxy S23',
        price: 79990,
        category: 'Электроника',
        description: 'Флагманский смартфон с лучшей камерой на рынке',
        fullDescription: 'Samsung Galaxy S23 - это инновационный смартфон с потрясающей камерой 200 МП, мощным процессором и долгим временем работы от аккумулятора. Идеально подходит для фотографии, игр и продуктивной работы.',
        specifications: {
          'Экран': '6.1" Dynamic AMOLED 2X',
          'Процессор': 'Snapdragon 8 Gen 2',
          'Память': '8GB RAM + 256GB ROM',
          'Камера': '200 МП + 10 МП + 12 МП',
          'Батарея': '3900 mAh'
        },
        inStock: true
      },
      2: {
        id: 2,
        name: 'Ноутбук Apple MacBook Air',
        price: 119990,
        category: 'Электроника',
        description: 'Мощный и легкий ноутбук для работы и творчества',
        fullDescription: 'MacBook Air с чипом M2 предлагает невероятную производительность в ультратонком корпусе. Идеален для работы, учебы и творческих проектов.',
        specifications: {
          'Экран': '13.6" Liquid Retina',
          'Процессор': 'Apple M2',
          'Память': '8GB RAM + 256GB SSD',
          'Батарея': 'До 18 часов',
          'Вес': '1.24 кг'
        },
        inStock: true
      },
      3: {
        id: 3,
        name: 'Кофемашина DeLonghi',
        price: 45990,
        category: 'Бытовая техника',
        description: 'Автоматическая кофемашина для идеального кофе',
        fullDescription: 'DeLonghi Magnifica S - полностью автоматическая кофемашина, которая готовит идеальный эспрессо, капучино и латте одним нажатием кнопки.',
        specifications: {
          'Тип': 'Автоматическая',
          'Давление': '15 бар',
          'Резервуар для воды': '1.8 л',
          'Резервуар для зерен': '250 г',
          'Автоотключение': 'Да'
        },
        inStock: true
      }
    };

    setTimeout(() => {
      const foundProduct = mockProducts[id];
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        setError('Товар не найден');
      }
      setLoading(false);
    }, 800);
  }, [id]);

  const handleBuy = () => {
    alert(`Товар "${product.name}" добавлен в корзину!`);
  };

  const handleBack = () => {
    navigate(-1); // Назад по истории
  };

  if (loading) {
    return (
      <div className="page">
        <div className="loading">
          <div className="spinner"></div>
          <p>Загружаем информацию о товаре...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <div className="alert alert-error">
          <h2>Ошибка</h2>
          <p>{error}</p>
          <Link to="/products" className="btn">
            Вернуться к каталогу
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={handleBack} className="btn btn-secondary">
          ← Назад
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
        <div>
          <h1>{product.name}</h1>
          <div className="price" style={{ fontSize: '1.5rem', margin: '1rem 0' }}>
            {product.price.toLocaleString()} ₽
          </div>
          <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '1.5rem' }}>
            {product.fullDescription}
          </p>

          <div style={{ marginBottom: '1.5rem' }}>
            <h3>Характеристики:</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {Object.entries(product.specifications).map(([key, value]) => (
                <li key={key} style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button onClick={handleBuy} className="btn btn-success" disabled={!product.inStock}>
              {product.inStock ? 'Добавить в корзину' : 'Нет в наличии'}
            </button>
            <Link to="/contact" className="btn">
              Задать вопрос
            </Link>
          </div>
        </div>

        <div style={{ background: '#f8f9fa', padding: '2rem', borderRadius: '8px' }}>
          <h3>Информация о товаре</h3>
          <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2' }}>
            <li><strong>Категория:</strong> {product.category}</li>
            <li><strong>Артикул:</strong> #{product.id.toString().padStart(6, '0')}</li>
            <li>
              <strong>Наличие:</strong> 
              <span style={{ color: product.inStock ? '#27ae60' : '#e74c3c', fontWeight: 'bold' }}>
                {product.inStock ? ' В наличии' : ' Нет в наличии'}
              </span>
            </li>
            <li><strong>Доставка:</strong> 1-3 дня</li>
            <li><strong>Гарантия:</strong> 12 месяцев</li>
          </ul>
        </div>
      </div>

      <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #eee' }}>
        <h3>Связанные товары</h3>
        <p>
          Посмотрите другие товары в нашем каталоге или 
          <Link to="/products" style={{ marginLeft: '0.5rem' }}>
            вернитесь к полному списку
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ProductDetail;