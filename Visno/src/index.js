const express = require("express")
const morgan = require("morgan")
const handlebars = require('express-handlebars')
const path = require('path')
const app = express()
const route = require('./routes')

const dotenv = require("dotenv")
dotenv.config()
const port = process.env.PORT

//* Connect db
const db = require('./config/db')
db.connect()

//* Set static files
app.use(express.static(path.join(__dirname, 'public')))

//* Middleware for request body-parser
app.use(express.urlencoded({
    extended : true
}))
app.use(express.json())

// app.use(morgan("combined"))

//* Set view engine to handlebars
app.engine('hbs', handlebars.engine({
    extname: '.hbs', // change file types name
    // helpers: require('./app/helpers/handlebars'),
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources/views'))

// Routing
route(app);

app.listen(port, () => console.log(`App listening at port : http://localhost:${port}`))