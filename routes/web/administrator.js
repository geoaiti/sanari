const express = require('express');
const router = express.Router();
const expressLayouts = require('express-ejs-layouts');

const layout = 'layouts/web/administrator/index';

const h = require('./../../config/helper');
router.use(h.checkAuth);

router.use(expressLayouts);
router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.layout = layout;
  req.app.set('layout' , true);
  next();
});

router.get('/', async (req, res) => {
  let data = {
    title : 'Administrator'
  };
  res.render('web/administrator', data);
});

router.get('/profile', async (req, res) => {
  // let data = {
  //   title : 'Administrator'
  // };
  // res.render('web/administrator', data);
  res.send({
    user : req.user
  });
});

router.get('/profile/dua', async (req, res) => {
  let data = {
    title : 'Administrator'
  };
  res.render('web/administrator', data);
});

router.post('/', async (req, res) => {
  res.send({
    user : req.user
  });
});

router.use((req, res, next) => {
  req.app.set('layout' , false);
  next();
});

module.exports = router;