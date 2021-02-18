const express = require('express');
const router = express.Router();
const expressLayouts = require('express-ejs-layouts');

const layout = 'layouts/web/user/index';

const h = require('./../../config/helper');
router.use(h.checkAuth);

router.use(expressLayouts);
router.use((req, res, next) => {
  res.locals.layout = layout;
  req.app.set('layout' , true);
  next();
});

router.get('/', function(req, res, next) {
  let data = {
    title : 'Sanari'
  };
  res.render('web/user', data);
});

router.use((req, res, next) => {
  req.app.set('layout' , false);
  next();
});

module.exports = router;