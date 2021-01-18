const express = require('express');
const router = express.Router();
const expressLayouts = require('express-ejs-layouts');

const layout = 'layouts/web/admin/index';

router.use(expressLayouts);
router.use((req, res, next) => {
  res.locals.layout = layout;
  req.app.set('layout' , true);
  next();
});

router.get('/', function(req, res, next) {
  let data = {
    title : 'Admin'
  };
  res.render('web/admin', data);
});

router.use((req, res, next) => {
  req.app.set('layout' , false);
  next();
});

module.exports = router;