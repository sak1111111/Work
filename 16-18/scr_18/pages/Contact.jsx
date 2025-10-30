import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    contactMethod: 'email'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Очистка ошибки при изменении поля
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Имя обязательно для заполнения';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен для заполнения';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Введите корректный email адрес';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Тема сообщения обязательна';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Сообщение не может быть пустым';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Сообщение должно содержать минимум 10 символов';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);

    // Имитация отправки формы
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Переход на страницу успеха с передачей данных
      navigate('/contact/success', { 
        state: { 
          formData,
          submittedAt: new Date().toLocaleString()
        }
      });
    } catch (error) {
      console.error('Ошибка при отправке формы:', error);
      alert('Произошла ошибка при отправке формы. Попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page">
      <h1>Свяжитесь с нами</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
        <div>
          <h2>Контактная информация</h2>
          <div style={{ marginBottom: '2rem' }}>
            <h3>Адрес</h3>
            <p>г. Москва, ул. Примерная, д. 123</p>
          </div>
          
          <div style={{ marginBottom: '2rem' }}>
            <h3>Телефоны</h3>
            <p>+7 (495) 123-45-67</p>
            <p>+7 (800) 123-45-68 (бесплатно по России)</p>
          </div>
          
          <div style={{ marginBottom: '2rem' }}>
            <h3>Email</h3>
            <p>info@example.com</p>
            <p>support@example.com</p>
          </div>
          
          <div>
            <h3>Режим работы</h3>
            <p>Пн-Пт: 9:00 - 20:00</p>
            <p>Сб-Вс: 10:00 - 18:00</p>
          </div>
        </div>

        <div>
          <h2>Форма обратной связи</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Ваше имя *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`form-control ${errors.name ? 'error' : ''}`}
                disabled={isSubmitting}
              />
              {errors.name && <div className="error-text">{errors.name}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-control ${errors.email ? 'error' : ''}`}
                disabled={isSubmitting}
              />
              {errors.email && <div className="error-text">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="subject">Тема сообщения *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`form-control ${errors.subject ? 'error' : ''}`}
                disabled={isSubmitting}
              />
              {errors.subject && <div className="error-text">{errors.subject}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="contactMethod">Предпочтительный способ связи</label>
              <select
                id="contactMethod"
                name="contactMethod"
                value={formData.contactMethod}
                onChange={handleChange}
                className="form-control"
                disabled={isSubmitting}
              >
                <option value="email">Email</option>
                <option value="phone">Телефон</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="telegram">Telegram</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Сообщение *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={`form-control ${errors.message ? 'error' : ''}`}
                disabled={isSubmitting}
                placeholder="Опишите ваш вопрос или проблему..."
              />
              {errors.message && <div className="error-text">{errors.message}</div>}
            </div>

            <button 
              type="submit" 
              className="btn btn-success"
              disabled={isSubmitting}
              style={{ width: '100%' }}
            >
              {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;