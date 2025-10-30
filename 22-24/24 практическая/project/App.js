import React, { useState, useEffect } from 'react';
import { itemsAPI } from './services/api';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Загрузка элементов при монтировании компонента
  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await itemsAPI.getAll();
      if (response.data.success) {
        setItems(response.data.data);
      }
    } catch (err) {
      setError(err.message || 'Ошибка при загрузке данных');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData) => {
    setLoading(true);
    setError('');
    try {
      const response = await itemsAPI.create(formData);
      if (response.data.success) {
        setItems(prev => [...prev, response.data.data]);
        setShowForm(false);
        setSuccess('Элемент успешно создан!');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      setError(err.message || 'Ошибка при создании элемента');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (formData) => {
    setLoading(true);
    setError('');
    try {
      const response = await itemsAPI.update(editingItem.id, formData);
      if (response.data.success) {
        setItems(prev => 
          prev.map(item => 
            item.id === editingItem.id ? response.data.data : item
          )
        );
        setEditingItem(null);
        setShowForm(false);
        setSuccess('Элемент успешно обновлен!');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      setError(err.message || 'Ошибка при обновлении элемента');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот элемент?')) {
      return;
    }

    setError('');
    try {
      const response = await itemsAPI.delete(id);
      if (response.data.success) {
        setItems(prev => prev.filter(item => item.id !== id));
        setSuccess('Элемент успешно удален!');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      setError(err.message || 'Ошибка при удалении элемента');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleFormSubmit = (formData) => {
    if (editingItem) {
      handleUpdate(formData);
    } else {
      handleCreate(formData);
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
    setShowForm(false);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Управление задачами</h1>
        <p>React + Express интеграция</p>
      </header>

      <main className="app-main">
        {error && (
          <div className="alert alert-error">
            {error}
            <button onClick={() => setError('')} className="close-btn">×</button>
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            {success}
            <button onClick={() => setSuccess('')} className="close-btn">×</button>
          </div>
        )}

        <div className="controls">
          <button 
            onClick={() => setShowForm(true)}
            className="btn btn-primary"
            disabled={showForm}
          >
            Создать новую задачу
          </button>
          <button 
            onClick={loadItems}
            className="btn btn-secondary"
          >
            Обновить список
          </button>
        </div>

        {showForm && (
          <div className="form-section">
            <h2>{editingItem ? 'Редактировать задачу' : 'Создать новую задачу'}</h2>
            <ItemForm
              onSubmit={handleFormSubmit}
              onCancel={handleCancel}
              initialData={editingItem}
              loading={loading}
            />
          </div>
        )}

        <div className="list-section">
          <h2>Список задач ({items.length})</h2>
          <ItemList
            items={items}
            onEdit={handleEdit}
            onDelete={handleDelete}
            loading={loading && !showForm}
          />
        </div>
      </main>
    </div>
  );
}

export default App;