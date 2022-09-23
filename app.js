// require packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')

// database connection
require('./config/mongoose')

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

// start and listen on the server
app.listen(port, () => console.log(`App is running on http://localhost:${port}`))