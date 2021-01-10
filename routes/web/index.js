const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/user', require('./user'));
router.use('/admin', require('./admin'));
router.use('/dashboard', require('./dashboard'));
router.use('/administrator', require('./administrator'));

module.exports = router;
