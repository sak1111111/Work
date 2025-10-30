import React, { useRef } from 'react';
import './UserRegistrationForm.css';

const ContactFormUncontrolled = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const subjectRef = useRef(null);
  const messageRef = useRef(null);
  const priorityRef = useRef(null);
  const subscribeRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      subject: subjectRef.current.value,
      message: messageRef.current.value,
      priority: priorityRef.current.value,
      subscribe: subscribeRef.current.checked
    };

    console.log('Данные формы (неуправляемый компонент):', formData);
    alert('Форма обратной связи отправлена! Проверьте консоль.');

    // Очистка формы
    e.target.reset();
  };

  return (
    <div className="form-container">
      <h2>Форма обратной связи (неуправляемый компонент)</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        {/* Имя */}
        <div className="form-group">
          <label htmlFor="contactName">Имя:</label>
          <input
            type="text"
            id="contactName"
            ref={nameRef}
            required
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="contactEmail">Email:</label>
          <input
            type="email"
            id="contactEmail"
            ref={emailRef}
            required
          />
        </div>

        {/* Тема */}
        <div className="form-group">
          <label htmlFor="subject">Тема:</label>
          <input
            type="text"
            id="subject"
            ref={subjectRef}
            required
          />
        </div>

        {/* Приоритет */}
        <div className="form-group">
          <label htmlFor="priority">Приоритет:</label>
          <select
            id="priority"
            ref={priorityRef}
            required
          >
            <option value="">Выберите приоритет</option>
            <option value="low">Низкий</option>
            <option value="medium">Средний</option>
            <option value="high">Высокий</option>
          </select>
        </div>

        {/* Сообщение */}
        <div className="form-group">
          <label htmlFor="message">Сообщение:</label>
          <textarea
            id="message"
            ref={messageRef}
            rows="5"
            placeholder="Опишите вашу проблему или вопрос..."
            required
          />
        </div>

        {/* Подписка */}
        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              ref={subscribeRef}
            />
            Подписаться на уведомления о статусе заявки
          </label>
        </div>

        {/* Кнопки */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" className="submit-btn">
            Отправить сообщение
          </button>
          <button 
            type="button" 
            className="submit-btn"
            style={{ backgroundColor: '#6c757d' }}
            onClick={() => {
              nameRef.current.value = '';
              emailRef.current.value = '';
              subjectRef.current.value = '';
              messageRef.current.value = '';
              priorityRef.current.value = '';
              subscribeRef.current.checked = false;
            }}
          >
            Очистить
          </button>
        </div>
      </form>

      <div className="form-preview">
        <h3>Информация о неуправляемых компонентах:</h3>
        <p>
          Эта форма использует useRef для доступа к значениям полей напрямую через DOM.
          Значения не управляются состоянием React и обновляются только при отправке формы.
        </p>
        <p>
          <strong>Преимущества:</strong> лучшея производительность для больших форм, 
          проще интеграция с не-React кодом.
        </p>
        <p>
          <strong>Недостатки:</strong> сложнее валидация в реальном времени, 
          меньше контроля над состоянием формы.
        </p>
      </div>
    </div>
  );
};

export default ContactFormUncontrolled;