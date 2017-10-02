const express = require('express')
const knex = require('../knex/knex')
const router = express.Router()

router.get('/books', function (req, res) {
  return knex('book')
  .join('book-author', 'book.id', '=','book_id')
  .join('author', 'author.id', '=','author_id')
    .then(books => {
      res.json(books)
    })
})


module.exports = router
