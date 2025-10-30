exports.up = function(knex) {
  return knex.schema
    .createTable('authors', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.text('bio');
      table.timestamps(true, true);
    })
    .createTable('categories', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.text('description');
      table.timestamps(true, true);
    })
    .createTable('books', function(table) {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.integer('author_id').unsigned().references('id').inTable('authors');
      table.integer('category_id').unsigned().references('id').inTable('categories');
      table.string('isbn').unique();
      table.integer('publication_year');
      table.timestamps(true, true);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('books')
    .dropTable('categories')
    .dropTable('authors');
};