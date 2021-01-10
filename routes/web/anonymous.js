const express = require('express');
const router = express.Router();
const expressLayouts = require('express-ejs-layouts');

const layout = 'layouts/anonymous/index';

router.use(expressLayouts);
router.use((req, res, next) => {
  res.locals.layout = layout;
  next();
});

router.get('/', function(req, res, next) {
  let data = {
    title : 'Sanari'
  };
  res.render('web/anonymous', data);
});

module.exports = router;