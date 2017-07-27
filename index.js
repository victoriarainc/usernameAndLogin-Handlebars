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
  console.log(user);
  res.send('You logged in!');
})

// // ============== VALIDATION ================
// // validate the food item's data
// req.checkBody('name', 'Name is required').notEmpty();
// // make sure that the serving is provided.
// req.checkBody('serving', 'Serving is required').notEmpty();
// // make sure that the serving is provided.
// req.checkBody('serving', 'Serving is must uppercase').isUppercase();
// // get all errors from our validation that we just did as an array
// let errors = req.validationErrors();
//
// if (errors) {
//   // there were errors, report them
//   console.log(errors);
//
//   res.render('foodForm', { errors: errors, foodItem: foodItem });
// } else {
//   // there were no errors. save the food item
//
//   // store the food item in our array of foods
//   req.session.foods.push(foodItem);
//
//   // now that I've added the food item to the array, redirect to the homepage
//   res.redirect('/');
// }
// });

// ============== LISTEN =================
app.listen(3000);
