
const router = express.Router();
const Author = require('../models/Author');

// GET /api/authors - все авторы
router.get('/', async (req, res) => {
  try {
    const authors = await Author.findAll();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/authors/:id - автор с книгами
router.get('/:id', async (req, res) => {
  try {
    const author = await Author.findByIdWithBooks(req.params.id);
    if (!author) {
      return res.status(404).json({ error: 'Author not found' });
    }
    res.json(author);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
