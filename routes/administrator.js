const express = require('express');
const router = express.Router();

router.get('/superadmin', function(req, res, next) {

  res.render('superadmin');
});

module.exports = router;
