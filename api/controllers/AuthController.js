/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {

    _config: {
        actions: false,
        shortcuts: false,
        rest: false
    },

    login: function(req, res) {

        passport.authenticate('local', function(err, user, info) {
            if ((err) || (!user)) {
                return res.send({
                    message: info.message,
                    token: jwToken.issue({id : user.id }),
                    user: user
                });
            }
            /** Content not generated BEGIN */
            var http = require('http')
              , methods = ['login', 'logIn', 'logout', 'logOut', 'isAuthenticated', 'isUnauthenticated'];
            /** Content not generated END */

            if (req.isSocket){
              // Initialize Passport
              passport.initialize()(req, res, function () {
                // Use the built-in sessions
                passport.session()(req, res, function () {
                      for (var i = 0; i < methods.length; i++) {
                        req[methods[i]] = http.IncomingMessage.prototype[methods[i]].bind(req);
                      }
                    req.logIn(user, function(err) {
                      if (err) res.send(err);
                      return res.send({
                          message: info.message,
                          token: jwToken.issue({id : user.id }),
                          user: user
                      });
                  });
                })
              })
            }
            else{
                  req.logIn(user, function(err) {
                      if (err) res.send(err);
                      return res.send({
                          message: info.message,
                          token: jwToken.issue({id : user.id }),
                          user: user
                      });
                  });
            }


        })(req, res);
    },

    logout: function(req, res) {
        req.logout();
        res.redirect('/');
    }
};
