import React, { useState } from 'react';
import './UserRegistrationForm.css';

const UserRegistrationFormWithValidation = () => {
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

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Имя обязательно для заполнения';
        } else if (value.trim().length < 2) {
          newErrors.name = 'Имя должно содержать минимум 2 символа';
        } else {
          delete newErrors.name;
        }
        break;

      case 'email':
        if (!value.trim()) {
          newErrors.email = 'Email обязателен для заполнения';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Введите корректный email адрес';
        } else {
          delete newErrors.email;
        }
        break;

      case 'password':
        if (!value) {
          newErrors.password = 'Пароль обязателен для заполнения';
        } else if (value.length < 8) {
          newErrors.password = 'Пароль должен содержать минимум 8 символов';
        } else {
          delete newErrors.password;
        }
        break;

      case 'confirmPassword':
        if (!value) {
          newErrors.confirmPassword = 'Подтверждение пароля обязательно';
        } else if (value !== formData.password) {
          newErrors.confirmPassword = 'Пароли не совпадают';
        } else {
          delete newErrors.confirmPassword;
        }
        break;

      case 'gender':
        if (!value) {
          newErrors.gender = 'Выберите пол';
        } else {
          delete newErrors.gender;
        }
        break;

      case 'age':
        if (!value) {
          newErrors.age = 'Выберите возраст';
        } else {
          delete newErrors.age;
        }
        break;

      case 'bio':
        if (!value.trim()) {
          newErrors.bio = 'Расскажите о себе';
        } else if (value.trim().length < 10) {
          newErrors.bio = 'Минимум 10 символов';
        } else {
          delete newErrors.bio;
        }
        break;

      default:
        break;
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData(prevData => ({
      ...prevData,
      [name]: newValue
    }));

    // Валидация при изменении
    if (touched[name]) {
      const newErrors = validateField(name, newValue);
      setErrors(newErrors);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const newErrors = validateField(name, value);
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Пометить все поля как touched для показа всех ошибок
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // Валидация всех полей
    let newErrors = {};
    Object.keys(formData).forEach(key => {
      const fieldErrors = validateField(key, formData[key]);
      newErrors = { ...newErrors, ...fieldErrors };
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Данные формы валидны:', formData);
      alert('Регистрация успешно завершена!');
      // Здесь обычно отправка данных на сервер
    } else {
      alert('Пожалуйста, исправьте ошибки в форме');
    }
  };

  const isFormValid = Object.keys(errors).length === 0;

  return (
    <div className="form-container">
      <h2>Регистрация пользователя с валидацией</h2>
      <form onSubmit={handleSubmit} className="registration-form" noValidate>
        {/* Имя */}
        <div className="form-group">
          <label htmlFor="name">Имя:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.name ? 'input-error' : ''}
            required
          />
          {errors.name && <div className="error">{errors.name}</div>}
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
            onBlur={handleBlur}
            className={errors.email ? 'input-error' : ''}
            required
          />
          {errors.email && <div className="error">{errors.email}</div>}
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
            onBlur={handleBlur}
            className={errors.password ? 'input-error' : ''}
            required
          />
          {errors.password && <div className="error">{errors.password}</div>}
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
            onBlur={handleBlur}
            className={errors.confirmPassword ? 'input-error' : ''}
            required
          />
          {errors.confirmPassword && (
            <div className="error">{errors.confirmPassword}</div>
          )}
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
                onBlur={handleBlur}
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
                onBlur={handleBlur}
              />
              Женский
            </label>
          </div>
          {errors.gender && <div className="error">{errors.gender}</div>}
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
            onBlur={handleBlur}
            className={errors.age ? 'input-error' : ''}
            required
          >
            <option value="">Выберите возраст</option>
            <option value="18-25">18-25</option>
            <option value="26-35">26-35</option>
            <option value="36-45">36-45</option>
            <option value="46+">46+</option>
          </select>
          {errors.age && <div className="error">{errors.age}</div>}
        </div>

        {/* О себе */}
        <div className="form-group">
          <label htmlFor="bio">О себе:</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            onBlur={handleBlur}
            rows="4"
            placeholder="Расскажите о себе..."
            className={errors.bio ? 'input-error' : ''}
          />
          {errors.bio && <div className="error">{errors.bio}</div>}
        </div>

        {/* Кнопка отправки */}
        <button 
          type="submit" 
          className="submit-btn"
          disabled={!isFormValid}
        >
          Зарегистрироваться
        </button>

        {/* Статус валидации */}
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          {isFormValid ? (
            <div className="success">Форма валидна. Можно отправлять!</div>
          ) : (
            <div className="error">
              В форме есть ошибки. Исправьте их перед отправкой.
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserRegistrationFormWithValidation;