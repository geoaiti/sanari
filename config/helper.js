const helper = {};

const db = require('./../database/models');

const sha = require('sha1');

helper.sha = (value) => {
    const key = 'very-safe';
    return sha(sha(key) + '' + value);
};

helper.compare = (password, user) => {
    let secret = helper.sha(user.id + '-' + password);
    return (secret === user.password);
};

helper.goTo = (req, res) => {
    let user_role = req.user.auth_user_roles.find(a => a.is_default == 1);
    if (!user_role) {
        req.logOut();
        return res.redirect('/auth/login');
    }
    let role = user_role.auth_group.auth_roles.find(a => a.is_default == 1);
    if (!role) {
        req.logOut();
        return res.redirect('/auth/login');
    }
    return res.redirect(`${role.permission_action.url_pattern}`);
}

helper.checkNotAuth = (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            return helper.goTo(req, res);
        }
        next();
    } catch (err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
};

helper.checkAuth = (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            let split_url = req.originalUrl.split('/');
            if (split_url[split_url.length - 1] == '' || split_url[split_url.length - 1].split('')[0] == '?') {
                if (split_url[split_url.length - 1].split('')[0] == '?') {
                    let query = split_url[split_url.length - 1];
                    split_url.pop();
                    return res.redirect(`${split_url.join('/')}${query}`);
                }
                split_url.pop();
                return res.redirect(split_url.join('/'));
            }
            if (req.user.active_role) {
                return next();
            }
            return res.redirect('/unauthorized.htm');
        }
        return res.redirect('/auth/login');
    } catch (err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
};

module.exports = helper;