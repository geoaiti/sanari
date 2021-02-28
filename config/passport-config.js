const helper = require('./helper');

const LocalStrategy = require('passport-local').Strategy

function initialize(passport, getUserByUsername, getUserById) {
  const authenticateUser = async (req, username = '', password = '', done) => {
    req.session.model = {};
    const user = await getUserByUsername(username);
    if (!user.length) {
      console.log('Wrong username');
      return done(null, false, { message: "No User With That Username"});
    }

    for (let i = 0; i < user.length; i++) {
      if (helper.compare(password, user[i])) {
        return done(null, await getUserById(req, user[i].id));
      }
    }
    
    console.log('Wrong password');
    return done(null, false, { message: "Password Incorrect" });
  }
  passport.use(new LocalStrategy({
    passReqToCallback: true
  }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (req, id, done) => done(null, await getUserById(req, id)));
}

module.exports = initialize;