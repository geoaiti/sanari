const express = require('express');
const router = express.Router();
const expressLayouts = require('express-ejs-layouts');

const layout = 'layouts/web/admin/index';

const h = require('./../../config/helper');
router.use(h.checkAuth);

router.use(expressLayouts);
router.use((req, res, next) => {
  res.locals.base_url_template = res.locals.base_url + "/templates/metrika/html";
  res.locals.user = req.user;
  res.locals.layout = layout;
  req.app.set('layout' , true);
  next();
});

router.get('/', async (req, res) => {
  let data = {
    title : 'Admin'
  };
  res.render('web/admin', data, (err, html) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    return res.send(html);
  });
});

router.get('/profile', async (req, res) => {
  let data = {
    title : 'Profile'
  };
  res.render('web/admin/profile', data, (err, html) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    return res.send(html);
  });
});

router.use((req, res, next) => {
  req.app.set('layout' , false);
  next();
});

module.exports = router;