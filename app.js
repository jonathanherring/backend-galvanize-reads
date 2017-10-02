const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors');
const bookRts = require('./routes/book-routes.js')
const PORT = process.env.PORT || 3000


app.use(bodyParser.json())
app.use(cors())
app.use(bookRts)


app.use(function(err, req, res, next){
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  })
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
