import React from 'react';

const ItemList = ({ items, onEdit, onDelete, loading }) => {
  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  if (!items || items.length === 0) {
    return <div className="empty">Нет элементов для отображения</div>;
  }

  return (
    <div className="item-list">
      {items.map((item) => (
        <div key={item.id} className={`item ${item.completed ? 'completed' : ''}`}>
          <div className="item-content">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className="item-meta">
              <span>Создано: {new Date(item.createdAt).toLocaleDateString()}</span>
              <span>Статус: {item.completed ? 'Выполнено' : 'В процессе'}</span>
            </div>
          </div>
          <div className="item-actions">
            <button 
              onClick={() => onEdit(item)}
              className="btn btn-edit"
            >
              Редактировать
            </button>
            <button 
              onClick={() => onDelete(item.id)}
              className="btn btn-delete"
            >
              Удалить
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;