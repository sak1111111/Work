import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="page">
      <h1>Добро пожаловать в наш магазин!</h1>
      
      <section style={{ marginBottom: '2rem' }}>
        <h2>О нашем магазине</h2>
        <p>
          Мы предлагаем широкий ассортимент качественных товаров по доступным ценам. 
          Наша компания работает на рынке более 10 лет и заслужила доверие тысяч клиентов.
        </p>
        <p>
          В нашем каталоге вы найдете товары для дома, электронику, книги и многое другое.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Почему выбирают нас?</h2>
        <ul style={{ lineHeight: '1.8', marginLeft: '2rem' }}>
          <li>Гарантия качества на все товары</li>
          <li>Быстрая доставка по всей стране</li>
          <li>Профессиональная служба поддержки</li>
          <li>Гибкая система скидок</li>
          <li>Удобные способы оплаты</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Специальные предложения</h2>
        <p>
          Не упустите возможность приобрести товары со скидкой до 30%! 
          Акция действует до конца месяца.
        </p>
        <Link to="/products" className="btn btn-success">
          Перейти к товарам
        </Link>
      </section>

      <section>
        <h2>Нужна помощь?</h2>
        <p>
          Наша служба поддержки готова ответить на все ваши вопросы. 
          Свяжитесь с нами удобным для вас способом.
        </p>
        <Link to="/contact" className="btn">
          Связаться с нами
        </Link>
      </section>
    </div>
  );
};

export default Home;