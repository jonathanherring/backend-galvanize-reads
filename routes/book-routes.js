const express = require('express')
const knex = require('../knex/knex')
const router = express.Router()

function reformatBooks(books) {
  const reformatted = []

  const booksById = {}
  books.forEach(book => {
    if (booksById[book.book_id]) {
      booksById[book.book_id].authors.push({
        first_name: book.first_name,
        last_name: book.last_name,
        author_id: book.author_id
      })
    } else {
      booksById[book.book_id] = {
        book_id: book.book_id,
        title: book.title,
        genre: book.genre,
        description: book.description,
        img_url: book.img_url,
        authors: [{
          first_name: book.first_name,
          last_name: book.last_name,
          author_id: book.author_id
        }]
      }
    }

    reformatted.push(booksById[book.book_id])

  })

  return reformatted
}

router.get('/books', function(req, res) {
  return knex('book')
    .select(
      'book.id as book_id',
      'title',
      'genre',
      'description',
      'img_url',
      'first_name',
      'last_name',
      'author.id as author_id')
    .join('book_author', 'book.id', '=', 'book_id')
    .join('author', 'author.id', '=', 'author_id')
    .then(books => {
      const reformatted = reformatBooks(books)
      res.json(reformatted)
    })
})

router.get('/book/:id', function (req, res) {
  var postId = req.params.id
  return knex('book')
    .where('id', '=', `${postId}`)
    .then(book => {
      res.json(book)
    })
})

router.post('/book', function(req, res) {
  let post = req.body
  knex('book').insert(post)
    .returning('*')
    .then(blogpost => {
      res.json(blogpost)
    })
})
router.put('/book/:id', function (req, res) {
  let postId = req.params.id
  let edit = req.body
  knex('book').update(edit)
    .where('id', '=', `${postId}`)
    .returning('*')
    .then(book => {
      res.json(book)
    })
})

router.delete('/book/:id', (req, res) => {
  let postId = parseInt(req.params.id)
  console.log(postId);
  knex('book')
    .del()
    .where('id', postId)
    .then(deleted => {
      res.json({
        message: 'Record Deleted'
      })
    })
})


module.exports = router
