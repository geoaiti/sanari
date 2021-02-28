const express = require('express');
const router = express.Router();
const passport = require('passport');

const config_passport = require('./../../config/passport-config');
const model = require('./../../app/model');
const db = require('./../../database/models');

config_passport(
    passport,
    async (username) => (await db.auth_account.findAll({
        where : {
            username
        }
    })),
    async (req, id) => (await model.user.getUserId(req, id)),
);

router.use(passport.initialize());
router.use(passport.session());

router.use('/auth', require('./auth'));
router.use('/user', require('./user'));
router.use('/admin', require('./admin'));
router.use('/dashboard', require('./dashboard'));
router.use('/administrator', require('./administrator'));

router.use((req, res, next) => {
    let split_url = req.originalUrl.split('/');
    if (split_url.length > 0) {
        if (split_url[split_url.length - 1].split('?').length > 0) {
            let query = [];
            if (split_url[split_url.length - 1].split('?').length > 1) {
                query = split_url[split_url.length - 1].split('?')[split_url[split_url.length - 1].split('?').length - 1];
            }
            split_url.pop();
            split_url[split_url.length - 1] = [split_url[split_url.length - 1], query].join('?');
            if (split_url[split_url.length - 1].split('?')[1] == '') {
                split_url[split_url.length - 1] = split_url[split_url.length - 1].split('?')[0];
                return res.redirect(`${split_url.length == 1 ? "/" : split_url.join('/')}`);
            }
            return res.redirect(`${split_url.length == 1 ? "/" : split_url.join('/')}`);
        }
        split_url.pop();
        return res.redirect(split_url.join('/'));
    }
    next();
});

module.exports = router;
