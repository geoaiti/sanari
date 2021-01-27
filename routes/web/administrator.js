const express = require('express');
const router = express.Router();
const expressLayouts = require('express-ejs-layouts');

const layout = 'layouts/web/administrator/index';

router.use(expressLayouts);
router.use((req, res, next) => {
  res.locals.layout = layout;
  req.app.set('layout' , true);
  next();
});

const db = require('./../../database/models');

router.post('/', function(req, res, next) {
  let data = {
    title : 'Administrator'
  };
  res.render('web/administrator', data);
});

router.get('/', async (req, res) => {
  res.send({
    user : req.user
  })
});

router.use((req, res, next) => {
  req.app.set('layout' , false);
  next();
});

module.exports = router;