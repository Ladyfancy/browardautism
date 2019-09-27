require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
// const Service    = require('./models/Service')
// const User         = require('./models/User');
const session = require("express-session");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const flash = require("connect-flash");


mongoose.connect('mongodb://localhost/starter-code', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

  
const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());



// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: true
}));


passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

app.use(flash());

app.use((req, res, next)=>{
  res.locals.theUser = req.session.currentuser;

  res.locals.errorMessage = req.flash('error');

  next();
})

passport.use(new LocalStrategy((username, password, next) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Sorry we couldn't find that username" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Password not correct for that username" });
    }

    return next(null, user);
  });
}));


app.use(passport.initialize());
app.use(passport.session());


// default value for title local

app.use((req, res, next) => {
  // Passport defines "req.user" if the user is logged in
  // ("req.user" is the result of deserialize)
  res.locals.currentUser = req.user;
  res.locals.msg         = req.flash('error');
  res.locals.success     = req.flash('success');

  // call "next()" to tell Express that we've finished
  // (otherwise your browser will hang)
  next();
});
app.locals.title = 'Famous & Fabulous services';



const index = require('./routes/index');
app.use('/', index);

const services = require('./routes/services');
app.use('/services', services);

const providers = require('./routes/providers');
app.use('/providers', providers)

const events = require('./routes/events');
app.use('/events', events)

const users = require('./routes/user-routes');
app.use('/user', users)


// app.use('/service', require('./routes/services'));
// app.use('/auth', require('./routes/auth'));
// app.use('/admin', require('./routes/admin'));


// ==========================================

module.exports = app;
