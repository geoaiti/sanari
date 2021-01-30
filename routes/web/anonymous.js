const express = require('express');
const router = express.Router();
const expressLayouts = require('express-ejs-layouts');

const layout = 'layouts/web/anonymous/index';

router.use(expressLayouts);
router.use((req, res, next) => {
  res.locals.layout = layout;
  req.app.set('layout' , true);
  next();
});

router.get('/', function(req, res, next) {
  let text = "sanjari";
  try {
    console.log(text.includes("san"));
  } catch (err) {
    console.log(err);
  }
  let data = {
    title : 'Sanari'
  };
  res.render('web/anonymous', data, (err, html) => {
    console.log(err);
    res.send(html);
  });
});

router.use((req, res, next) => {
  req.app.set('layout' , false);
  next();
});

module.exports = router;