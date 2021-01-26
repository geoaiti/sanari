const helper = {};

const sha = require('sha1');

helper.sha = (value) => {
    const key = 'very-safe';
    return sha(sha(key) + '' + value);
};

helper.compare = (password, user) => {
    let secret = helper.sha(user.id + '-' + password);
    return (secret === user.password);
};

module.exports = helper;