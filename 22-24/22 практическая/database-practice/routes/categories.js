
const router = express.Router();
const Category = require('../models/Category');

// GET /api/categories - все категории
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
