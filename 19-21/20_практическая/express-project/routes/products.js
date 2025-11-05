const express = require('express');
const router = express.Router();

// Временное хранилище данных
let products = [
    { id: 1, name: 'Ноутбук Dell XPS 13', price: 89990, category: 'laptops', inStock: true },
    { id: 2, name: 'iPhone 15 Pro', price: 99990, category: 'smartphones', inStock: true },
    { id: 3, name: 'Samsung Galaxy Tab S9', price: 74990, category: 'tablets', inStock: false },
    { id: 4, name: 'MacBook Air M2', price: 109990, category: 'laptops', inStock: true },
    { id: 5, name: 'Sony WH-1000XM4', price: 29990, category: 'headphones', inStock: true }
];

// Middleware для поиска товара по ID
router.param('productId', (req, res, next, id) => {
    const productId = parseInt(id);
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        return res.status(404).json({
            error: 'Товар не найден',
            productId: id
        });
    }
    
    req.product = product;
    req.productId = productId;
    next();
});

// GET /api/products - Получить все товары с фильтрацией
router.get('/', (req, res) => {
    const { category, inStock, minPrice, maxPrice, search, sortBy = 'name', order = 'asc' } = req.query;
    
    let filteredProducts = [...products];
    
    // Фильтрация по категории
    if (category) {
        filteredProducts = filteredProducts.filter(product => 
            product.category === category
        );
    }
    
    // Фильтрация по наличию
    if (inStock !== undefined) {
        const inStockBool = inStock === 'true';
        filteredProducts = filteredProducts.filter(product => 
            product.inStock === inStockBool
        );
    }
    
    // Фильтрация по цене
    if (minPrice) {
        filteredProducts = filteredProducts.filter(product => 
            product.price >= parseInt(minPrice)
        );
    }
    
    if (maxPrice) {
        filteredProducts = filteredProducts.filter(product => 
            product.price <= parseInt(maxPrice)
        );
    }
    
    // Поиск по названию
    if (search) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(search.toLowerCase())
        );
    }
    
    // Сортировка
    filteredProducts.sort((a, b) => {
        const multiplier = order === 'desc' ? -1 : 1;
        
        if (sortBy === 'price') {
            return (a.price - b.price) * multiplier;
        } else if (sortBy === 'name') {
            return a.name.localeCompare(b.name) * multiplier;
        }
        
        return 0;
    });
    
    res.json({
        products: filteredProducts,
        filters: {
            category: category || null,
            inStock: inStock || null,
            minPrice: minPrice || null,
            maxPrice: maxPrice || null,
            search: search || null,
            sortBy,
            order
        },
        total: filteredProducts.length
    });
});

// GET /api/products/categories - Получить список категорий
router.get('/categories', (req, res) => {
    const categories = [...new Set(products.map(p => p.category))];
    
    res.json({
        categories: categories.map(category => ({
            name: category,
            count: products.filter(p => p.category === category).length
        }))
    });
});

// GET /api/products/:productId - Получить товар по ID
router.get('/:productId', (req, res) => {
    res.json({
        product: req.product
    });
});

// POST /api/products - Создать новый товар
router.post('/', (req, res) => {
    const { name, price, category, inStock = true } = req.body;
    
    // Валидация
    if (!name || !price || !category) {
        return res.status(400).json({
            error: 'Название, цена и категория обязательны для заполнения'
        });
    }
    
    if (price < 0) {
        return res.status(400).json({
            error: 'Цена не может быть отрицательной'
        });
    }
    
    const newProduct = {
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        name,
        price: parseInt(price),
        category,
        inStock: Boolean(inStock)
    };
    
    products.push(newProduct);
    
    res.status(201).json({
        message: 'Товар успешно создан',
        product: newProduct
    });
});

// PUT /api/products/:productId - Полное обновление товара
router.put('/:productId', (req, res) => {
    const { name, price, category, inStock } = req.body;
    
    if (!name || !price || !category) {
        return res.status(400).json({
            error: 'Название, цена и категория обязательны для заполнения'
        });
    }
    
    if (price < 0) {
        return res.status(400).json({
            error: 'Цена не может быть отрицательной'
        });
    }
    
    const productIndex = products.findIndex(p => p.id === req.productId);
    products[productIndex] = {
        id: req.productId,
        name,
        price: parseInt(price),
        category,
        inStock: Boolean(inStock)
    };
    
    res.json({
        message: 'Товар успешно обновлен',
        product: products[productIndex]
    });
});

// DELETE /api/products/:productId - Удалить товар
router.delete('/:productId', (req, res) => {
    const productIndex = products.findIndex(p => p.id === req.productId);
    const deletedProduct = products.splice(productIndex, 1)[0];
    
    res.json({
        message: 'Товар успешно удален',
        product: deletedProduct
    });
});

// PATCH /api/products/:productId/stock - Обновить наличие товара
router.patch('/:productId/stock', (req, res) => {
    const { inStock } = req.body;
    
    if (inStock === undefined) {
        return res.status(400).json({
            error: 'Поле inStock обязательно'
        });
    }
    
    const productIndex = products.findIndex(p => p.id === req.productId);
    products[productIndex].inStock = Boolean(inStock);
    
    res.json({
        message: `Наличие товара обновлено: ${inStock ? 'в наличии' : 'нет в наличии'}`,
        product: products[productIndex]
    });
});

module.exports = router;