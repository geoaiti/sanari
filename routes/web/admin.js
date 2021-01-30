const express = require('express');
const router = express.Router();
const expressLayouts = require('express-ejs-layouts');

const layout = 'layouts/web/admin/index';

const h = require('./../../config/helper');
router.use(h.checkAuth);

router.use(expressLayouts);
router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.layout = layout;
  req.app.set('layout' , true);
  next();
});

router.get('/', function(req, res, next) {
    let data = {
      title : 'Admin'
    };
    res.render('web/admin', data, (err, html) => {
      console.log(err);
      res.send(html)
    });
});

router.get('/profile', function(req, res, next) {
    let data = {
      title : 'Admin'
    };
    res.render('web/admin', data, (err, html) => {
      console.log(err);
      res.send(html)
    });
});

router.use((req, res, next) => {
  req.app.set('layout' , false);
  next();
});

module.exports = router;