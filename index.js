// ===========PACKAGES===========

const express = require('express');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const app = express();

// =========BOILER PLATE===========

// for handlebars
app.engine('handlebars', exphbs());
app.set('views', './views');
app.set('view engine', 'handlebars');

// for express-session
app.use(
  session({
    secret: 'CROWpoe',
    resave: false, // doesn't save without changes
    saveUninitialized: true // creates a session
  })
);

//for morgan
app.use(morgan('dev'));

// for express
app.use(express.static('public'));

//for bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// for express-validator
app.use(expressValidator());

// creates default session
// app.use((req, res, next) => {
//   // if we don't already have an array of foods
//   if (!req.session.foods) {
//     // then create an empty array of foods
//     req.session.foods = [];
//   }
//
//   console.log(req.session);
//
//   next();
// });

app.listen(3000);
