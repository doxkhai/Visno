const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const cookieParser = require('cookie-parser')
const handlebars = require('express-handlebars')
const session = require('express-session');
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const path = require('path')
const app = express()
const route = require('./routes')

const dotenv = require("dotenv")
dotenv.config()
const port = process.env.PORT


//* Set static files
app.use(express.static(path.join(__dirname, 'public')))

//* Set up session
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(
    session({
        secret: process.env.SESSION_KEY,
        resave: true,
        saveUninitialized: false,
    })
);
app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});

app.use(cors())
app.use(cookieParser())
app.use(methodOverride('_method')); //override using a query value


//* Connect db
const db = require('./config/db')
db.connect(process.env.MONGODB_URL)


//* Middleware for request body-parser
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

// app.use(morgan("combined"))

//* Set view engine to handlebars
app.engine('hbs', handlebars.engine({
    extname: '.hbs', // change file types name
    helpers: require('./app/helpers/handlebars'),
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources/views'))

// Routing
route(app);

app.listen(port, () => console.log(`App listening at port : http://localhost:${port}`))