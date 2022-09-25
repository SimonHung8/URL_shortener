// require packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')

// database connection
require('./config/mongoose')

const URL = require('./models/URL')
const shortenURL = require('./utilities/shortenURL')

const app = express()
const port = 3000

// setting body-parser
app.use(express.urlencoded({ extended: true }))

// setting template engine
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

// setting static css file
app.use(express.static('public'))

// setting routes
app.get('/', (req, res) => res.render('index'))
app.post('/', (req, res) => {
  const originalURL = req.body.url
  if(!req.body.url) return res.redirect('/')
  const shortURL = shortenURL()
  URL.findOne({ originalURL })
    .then(url => {
      // 若已經建立過短網址，回傳原本的短網址，若尚未建立，則回傳新的短網址
      return url ? url : URL.create({ originalURL, shortURL })
    })
    .then(url => {
      res.render('index', { shortURL: url.shortURL, originalURL: url.originalURL })
    })
    .catch(err => console.log(err))
})
app.get('/:shortURL', (req, res) => {
  const shortURL = req.params.shortURL
  URL.findOne({ shortURL })
    .then(url => {
      if(!url) return res.render('cannotFind', {shortURL})
      res.redirect(url.originalURL)
    })
    .catch(err => console.log(err))
})

// start and listen on the server
app.listen(port, () => console.log(`App is running on http://localhost:${port}`))