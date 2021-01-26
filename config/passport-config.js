const helper = require('./helper');

const LocalStrategy = require('passport-local').Strategy

function initialize(passport, getUserByUsername, getUserById) {
  const authenticateUser = async (username, password, done) => {
    const user = await getUserByUsername(username);
    if (!user.length) {
        console.log('Wrong username');
        return done(null, false, { message: "No User With That Username"});
    }

    for (let i = 0; i < user.length; i++) {
        if (helper.compare(password, user[i])) {
            return done(null, user[i]);
        }
    }
    console.log('Wrong password');
    return done(null, false, { message: "Password Incorrect" });
  }

  passport.use(new LocalStrategy(authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    return done(null, await getUserById(id))
  });
}

module.exports = initialize;