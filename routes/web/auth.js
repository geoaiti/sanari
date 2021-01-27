const express = require('express');
const router = express.Router();
const passport = require('passport');
const expressLayouts = require('express-ejs-layouts');

const layout = 'layouts/web/auth/index';

router.use(expressLayouts);
router.use((req, res, next) => {
  res.locals.username = req.session.username ? req.session.username: "";
  req.session.username = req.body.username ? req.body.username : "";
  res.locals.auth = req.session.flash ? req.session.flash.error : "";
  res.locals.layout = layout;
  req.app.set('layout' , true);
  next();
});
router.use((req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/administrator');
  }
  next();
});

router.get('/login', (req, res, next) => {
  let data = {
    title : 'Sanari',
    action : 'auth/login',
  };
  res.render('web/auth/login', data);
});

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/auth/login', failureFlash: true }),
  (req, res, next) => {
    delete req.session.username;
    res.redirect('/administrator');
  }
);

router.get('/*', (req, res) => res.redirect('/auth/login'));
router.use((req, res, next) => {
  req.app.set('layout' , false);
  next();
});

module.exports = router;