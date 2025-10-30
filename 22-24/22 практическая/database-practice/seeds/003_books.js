exports.seed = async function(knex) {
  await knex('books').del();
  await knex('books').insert([
    { 
      title: 'Война и мир', 
      author_id: 1, 
      category_id: 1, 
      isbn: '978-5-699-12014-7', 
      publication_year: 1869 
    },
    { 
      title: 'Анна Каренина', 
      author_id: 1, 
      category_id: 1, 
      isbn: '978-5-04-103190-2', 
      publication_year: 1877 
    },
    { 
      title: 'Преступление и наказание', 
      author_id: 2, 
      category_id: 1, 
      isbn: '978-5-17-087907-0', 
      publication_year: 1866 
    }
  ]);
};