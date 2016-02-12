var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
bcrypt = require('bcrypt');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findOne({ id: id } , function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, done) {

    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, {
          code: 404,
          message: 'Incorrect Username.'
        });
      }

      bcrypt.compare(password, user.password, function (err, res) {
          if (!res)
            return done(null, false, {
              code: 404,
              message: 'Invalid Password'
            });
          var returnUser = {
            username: user.username,
            email: user.email,
            role: user.role,
            id: user.id
          };
          return done(null, returnUser, {
            code: 200,
            message: 'Logged In Successfully'
          });
        });
    });
  }
));
