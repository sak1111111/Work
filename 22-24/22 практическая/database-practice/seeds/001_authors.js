exports.seed = async function(knex) {
  await knex('authors').del();
  await knex('authors').insert([
    { name: 'Лев Толстой', bio: 'Русский писатель' },
    { name: 'Фёдор Достоевский', bio: 'Русский писатель' },
    { name: 'Антон Чехов', bio: 'Русский писатель и драматург' }
  ]);
};