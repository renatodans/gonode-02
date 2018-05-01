const express = require('express');

const routes = express.Router();

const authMiddleware = require('./middlewares/auth');
const guestMiddleware = require('./middlewares/guest');

const authController = require('./controllers/authController');
const dashboardController = require('./controllers/dashboardController');

const projectController = require('./controllers/projectController');
const sectionController = require('./controllers/sectionController');

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

/**
 * Dashboard
 */
routes.use('/app', authMiddleware);
routes.get('/app/dashboard', dashboardController.index);

/**
 * Projects
 */
routes.get('/app/projects/:id', projectController.show);
routes.post('/app/projects/create', projectController.store);
routes.delete('/app/projects/delete/:id', projectController.destroy);

/**
 * Sections
 */
routes.get('/app/projects/:projectId/sections/:id', sectionController.show);
routes.post('/app/sections/create', sectionController.store);
routes.put('/app/sections/update/:id', sectionController.update);
routes.delete('/app/sections/delete/:id', sectionController.destroy);

// catch 404
routes.use((req, res) => res.render('errors/404'));


// error handler
routes.use((err, req, res, _next) => {
  res.status(err.status || 500);

  return res.render('errors/index', {
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {},
  });
});

module.exports = routes;
