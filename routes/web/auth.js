const express = require('express');
const router = express.Router();
const expressLayouts = require('express-ejs-layouts');

const layout = 'layouts/web/auth/index';

router.use(expressLayouts);
router.use((req, res, next) => {
  res.locals.layout = layout;
  req.app.set('layout' , true);
  next();
});

router.get('/login', function(req, res, next) {
  let data = {
    title : 'Sanari'
  };
  res.render('web/auth/login', data);
});

router.get('/register', function(req, res, next) {
  let data = {
    title : 'Sanari'
  };
  res.render('web/auth/register', data);
});

router.use((req, res, next) => {
  req.app.set('layout' , false);
  next();
});

module.exports = router;