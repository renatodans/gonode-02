const express = require('express');

const routes = express.Router();

const authMiddleware = require('./middlewares/auth');
const guestMiddleware = require('./middlewares/guest');


const authController = require('./controllers/authController');

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success');
  res.locals.flashError = req.flash('error');
  next();
});

routes.get('/', guestMiddleware, authController.signin);
routes.get('/signup', guestMiddleware, authController.singup);
routes.get('/signout', authController.singout);

routes.post('/register', authController.register);
routes.post('/authenticate', authController.authenticate);

// catch 404
routes.use((req, res) => res.render('errors/404'));


// error handler
routes.use((err, req, res, _next) => {
  res.status(err.status || 500);

  return res.render('errors/index', {
    message: err.message,
    error: process.env.NODE_ENV === 'production' ? {} : err,
  });
});

module.exports = routes;
