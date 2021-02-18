const express = require('express');
const router = express.Router();
const passport = require('passport');

const config_passport = require('./../../config/passport-config');
const db = require('./../../app/model');

config_passport(
    passport,
    async (username) => 
        (await db.account.getAll({
            where : {
                username
            }
        })),
    async (id) => (await db.account.getById(id))
);

router.use(passport.initialize());
router.use(passport.session());

router.use('/auth', require('./auth'));
router.use('/user', require('./user'));
router.use('/admin', require('./admin'));
router.use('/dashboard', require('./dashboard'));
router.use('/administrator', require('./administrator'));

module.exports = router;
