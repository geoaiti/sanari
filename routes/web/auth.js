const express = require('express');
const router = express.Router();
const expressLayouts = require('express-ejs-layouts');

const layout = 'layouts/auth/index';

router.use(expressLayouts);
router.use((req, res, next) => {
  res.locals.layout = layout;
  next();
});

router.get('/', function(req, res, next) {
  let data = {
    title : 'Sanari'
  };
  res.render('web/auth', data);
});

module.exports = router;