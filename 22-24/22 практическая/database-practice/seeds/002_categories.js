exports.seed = async function(knex) {
  await knex('categories').del();
  await knex('categories').insert([
    { name: 'Роман', description: 'Художественная проза' },
    { name: 'Рассказ', description: 'Короткая проза' },
    { name: 'Драма', description: 'Пьесы и драматургия' }
  ]);
};
