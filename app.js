// require packages used in the project
const express = require('express')

// database connection
require('./config/mongoose')

const app = express()
const port = 3000

// setting routes
app.get('/', (req, res) => res.send('project init: URL_shortener'))

// start and listen on the server
app.listen(port, () => console.log(`App is running on http://localhost:${port}`))