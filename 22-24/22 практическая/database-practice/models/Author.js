
class Author {
  static async findAll() {
    return await db('authors').select('*');
  }

  static async findByIdWithBooks(id) {
    const author = await db('authors').where({ id }).first();
    const books = await db('books').where({ author_id: id });
    return { ...author, books };
  }

  static async create(authorData) {
    const [author] = await db('authors').insert(authorData).returning('*');
    return author;
  }
}
