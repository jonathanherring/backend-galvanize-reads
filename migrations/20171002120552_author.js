
exports.up = function(knex, Promise) {
  return knex.schema.createTable("author", function(table) {
    table.increments("id")
    table.varchar("first_name")
    table.varchar("last_name")
    table.text("bio")
    table.text("portrait_url")
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("author")
};
