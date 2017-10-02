
exports.up = function(knex, Promise) {
  return knex.schema.createTable("book", function(table) {
    table.increments("id")
    table.varchar("title")
    table.varchar("genre")
    table.text("description")
    table.text("img_url")
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("book")
};
