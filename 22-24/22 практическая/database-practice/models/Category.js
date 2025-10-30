class Category {
  static async findAll() {
    return await db('categories').select('*');
  }

  static async create(categoryData) {
    const [category] = await db('categories').insert(categoryData).returning('*');
    return category;
  }
}