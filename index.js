// ===========PACKAGES===========

const express = require('express');
const exphbs = require('express-handlebars');
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
    //in the future this is not how to store passwords
    secret: 'CROWpoe',
    resave: false, // doesn't save without changes
    saveUninitialized: true // creates a session
  })
);

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
// ======= SUPER DUPER SECURE DATABASE =====

let topsecret = [{username:'Victoria', password:'rattleballs'}];

// ============= ENDPOINTS ===============

// path to home
app.get('/', function(req, res) {
  if (!req.session.user) {
    res.redirect('/login')
  } else {
    res.render('home')
  }
});

// path to login
app.get('/login', function(req, res) {
  res.render('login')
});

// send information after it is submitted
app.post('/login', function(req, res) {
  let user = req.body;
  // // ============== VALIDATION ================
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password please!').notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    console.log(errors);
    res.render('login', {errors: errors});
  } else {
    res.redirect('/');
  }
});



// ============== LISTEN =================
app.listen(3000);
