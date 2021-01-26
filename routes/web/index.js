const express = require('express');
const router = express.Router();
const passport = require('passport');

const db = require('./../../database/models');
const config_passport = require('./../../config/passport-config');

config_passport(
    passport,
    async (username) => 
        (await db.auth_account.findAll({
            where : {
                username
            }
        }))
    ,
    async (id) => 
        (await db.auth_account.findByPk(id))
);

router.use(passport.initialize());
router.use(passport.session());

router.use('/auth', require('./auth'));
router.use('/user', require('./user'));
router.use('/admin', require('./admin'));
router.use('/dashboard', require('./dashboard'));
router.use('/administrator', require('./administrator'));

module.exports = router;
