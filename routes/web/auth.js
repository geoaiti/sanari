const express = require('express');
const router = express.Router();
const passport = require('passport');
const expressLayouts = require('express-ejs-layouts');

const h = require('./../../config/helper');
const db = require('./../../database/models');

const layout = 'layouts/web/auth/index';

router.use(expressLayouts);
router.use((req, res, next) => {
  res.locals.username = req.session.username ? req.session.username: "";
  req.session.username = req.body.username ? req.body.username : "";
  res.locals.auth_error = req.session.flash ? req.session.flash.error : "";
  res.locals.base_url_template = res.locals.base_url + "/templates/metrika/html";
  res.locals.layout = layout;
  req.app.set('layout' , true);
  next();
});

router.get('/login', h.checkNotAuth, (req, res, next) => {
  let data = {
    title : 'Login',
    action : 'auth/login',
  };
  res.render('web/auth/login', data, (err, html) => {
    if (err) {
      console.log(err);
    }
    res.send(html);
  });
});

router.post('/login',
  h.checkNotAuth,
  passport.authenticate('local', { failureRedirect: '/auth/login', failureFlash: true }),
  async (req, res, next) => {
    delete req.session.username;
    try {
      await h.goTo(req, res);
    } catch (err) {
      console.log(err);
      res.redirect('/auth/login');
    }
  }
);

// router.get('/register', h.checkNotAuth, (req, res, next) => {
//   let data = {
//     title : 'Register',
//     action : 'auth/register',
//   };
//   res.render('web/auth/register', data);
// });

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/auth/login');
});

router.get('/*', h.checkNotAuth, (req, res) => res.redirect('/auth/login'));
router.use((req, res, next) => {
  req.app.set('layout' , false);
  next();
});

module.exports = router;