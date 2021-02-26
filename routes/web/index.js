const express = require('express');
const router = express.Router();
const passport = require('passport');

const config_passport = require('./../../config/passport-config');
const model = require('./../../app/model');
const db = require('./../../database/models');

config_passport(
    passport,
    // async (username) => 
    //     (await db.account.getAll({
    //         where : {
    //             username
    //         }
    //     })),
    async (username) => (await db.auth_account.findAll({
        where : {
            username
        }
    })),
    async (id) => (await model.user.getUserId(id)),
    // async (id) => (await model.account.getById(id)),
    // async (id) => {
    //     let user = await model.user.getUserId(id);
    //     let data = await db.account.getById(id);
    //     return user;
    // }
);

router.use(passport.initialize());
router.use(passport.session());

router.use('/auth', require('./auth'));
router.use('/user', require('./user'));
router.use('/admin', require('./admin'));
router.use('/dashboard', require('./dashboard'));
router.use('/administrator', require('./administrator'));

module.exports = router;
