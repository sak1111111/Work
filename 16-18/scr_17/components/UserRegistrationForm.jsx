import React, { useState } from 'react';
import './UserRegistrationForm.css';

const UserRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    newsletter: false,
    age: '',
    bio: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Данные формы:', formData);
    alert('Форма отправлена! Проверьте консоль для просмотра данных.');
  };

  return (
    <div className="form-container">
      <h2>Регистрация пользователя</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        {/* Имя */}
        <div className="form-group">
          <label htmlFor="name">Имя:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Пароль */}
        <div className="form-group">
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Подтверждение пароля */}
        <div className="form-group">
          <label htmlFor="confirmPassword">Подтверждение пароля:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {/* Пол */}
        <div className="form-group">
          <label>Пол:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleChange}
              />
              Мужской
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleChange}
              />
              Женский
            </label>
          </div>
        </div>

        {/* Подписка на рассылку */}
        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleChange}
            />
            Подписаться на рассылку
          </label>
        </div>

        {/* Возраст */}
        <div className="form-group">
          <label htmlFor="age">Возраст:</label>
          <select
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          >
            <option value="">Выберите возраст</option>
            <option value="18-25">18-25</option>
            <option value="26-35">26-35</option>
            <option value="36-45">36-45</option>
            <option value="46+">46+</option>
          </select>
        </div>

        {/* О себе */}
        <div className="form-group">
          <label htmlFor="bio">О себе:</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="4"
            placeholder="Расскажите о себе..."
          />
        </div>

        {/* Кнопка отправки */}
        <button type="submit" className="submit-btn">
          Зарегистрироваться
        </button>
      </form>

      {/* Предпросмотр данных */}
      <div className="form-preview">
        <h3>Предпросмотр данных:</h3>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default UserRegistrationForm;