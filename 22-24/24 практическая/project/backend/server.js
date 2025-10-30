const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (в реальном приложении используйте базу данных)
let items = [
  {
    id: '1',
    title: 'Изучить React',
    description: 'Освоить основы React и хуки',
    completed: false,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Написать API',
    description: 'Создать Express сервер с CRUD endpoints',
    completed: true,
    createdAt: new Date().toISOString()
  }
];

// Routes
// GET /api/items - получить все элементы
app.get('/api/items', (req, res) => {
  try {
    res.json({
      success: true,
      data: items,
      total: items.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении данных'
    });
  }
});

// GET /api/items/:id - получить элемент по ID
app.get('/api/items/:id', (req, res) => {
  try {
    const item = items.find(i => i.id === req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Элемент не найден'
      });
    }
    res.json({
      success: true,
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении элемента'
    });
  }
});

// POST /api/items - создать новый элемент
app.post('/api/items', (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title и description обязательны'
      });
    }

    const newItem = {
      id: uuidv4(),
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString()
    };

    items.push(newItem);

    res.status(201).json({
      success: true,
      data: newItem,
      message: 'Элемент успешно создан'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Ошибка при создании элемента'
    });
  }
});

// PUT /api/items/:id - обновить элемент
app.put('/api/items/:id', (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const itemIndex = items.findIndex(i => i.id === req.params.id);

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Элемент не найден'
      });
    }

    items[itemIndex] = {
      ...items[itemIndex],
      title: title || items[itemIndex].title,
      description: description || items[itemIndex].description,
      completed: completed !== undefined ? completed : items[itemIndex].completed
    };

    res.json({
      success: true,
      data: items[itemIndex],
      message: 'Элемент успешно обновлен'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Ошибка при обновлении элемента'
    });
  }
});

// DELETE /api/items/:id - удалить элемент
app.delete('/api/items/:id', (req, res) => {
  try {
    const itemIndex = items.findIndex(i => i.id === req.params.id);

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Элемент не найден'
      });
    }

    const deletedItem = items.splice(itemIndex, 1)[0];

    res.json({
      success: true,
      data: deletedItem,
      message: 'Элемент успешно удален'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Ошибка при удалении элемента'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});