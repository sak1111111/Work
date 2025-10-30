import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const ContactSuccess = () => {
  const location = useLocation();
  const { formData, submittedAt } = location.state || {};

  return (
    <div className="page">
      <div className="alert alert-success">
        <h1>Сообщение отправлено успешно! ✅</h1>
        <p>Благодарим вас за обращение. Мы свяжемся с вами в ближайшее время.</p>
      </div>

      {formData && (
        <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#f8f9fa', borderRadius: '8px' }}>
          <h2>Детали вашего обращения</h2>
          <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.8' }}>
            <li><strong>Имя:</strong> {formData.name}</li>
            <li><strong>Email:</strong> {formData.email}</li>
            <li><strong>Тема:</strong> {formData.subject}</li>
            <li><strong>Способ связи:</strong> {formData.contactMethod}</li>
            <li><strong>Время отправки:</strong> {submittedAt}</li>
          </ul>
          
          <div style={{ marginTop: '1rem', padding: '1rem', background: 'white', borderRadius: '4px' }}>
            <strong>Сообщение:</strong>
            <p style={{ marginTop: '0.5rem', fontStyle: 'italic' }}>{formData.message}</p>
          </div>
        </div>
      )}

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <p>Что вы хотите сделать дальше?</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn">
            На главную
          </Link>
          <Link to="/products" className="btn btn-secondary">
            Посмотреть товары
          </Link>
          <Link to="/contact" className="btn">
            Отправить еще одно сообщение
          </Link>
        </div>
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#e8f4fd', borderRadius: '8px' }}>
        <h3>Что происходит дальше?</h3>
        <ol style={{ lineHeight: '1.6', paddingLeft: '1.5rem' }}>
          <li>Наш менеджер обработает ваше обращение в течение 1 часа</li>
          <li>Мы свяжемся с вами выбранным способом в рабочее время</li>
          <li>Вы получите подробный ответ на ваш вопрос</li>
          <li>При необходимости мы предложим решение вашей проблемы</li>
        </ol>
      </div>
    </div>
  );
};

export default ContactSuccess;