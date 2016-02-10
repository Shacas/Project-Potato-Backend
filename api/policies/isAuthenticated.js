// /** Content not generated BEGIN */
// var http = require('http')
//   , methods = ['login', 'logIn', 'logout', 'logOut', 'isAuthenticated', 'isUnauthenticated'];
// /** Content not generated END */
//
// module.exports = function(req, res, next) {
//
//
//     // User is allowed, proceed to the next policy,
//     // or if this is the last policy, the controller
//     // Sockets
//     if(req.isSocket)
//     {
//
//         if(req.session &&
//             req.session.passport &&
//             req.session.passport.user)
//         {
//             //Use this:
//
//
//             // Initialize Passport
//             sails.config.passport.initialize()(req, res, function () {
//                 // Use the built-in sessions
//                 sails.config.passport.session()(req, res, function () {
//                     // Make the user available throughout the frontend
//                     res.locals.user = req.user;
//                     //the user should be deserialized by passport now;
//
//                     /** Content not generated BEGIN */
//                     // Make the passport methods available for websocket requests
//                       for (var i = 0; i < methods.length; i++) {
//                         req[methods[i]] = http.IncomingMessage.prototype[methods[i]].bind(req);
//                       }
//                     /** Content not generated END */
//
//                     next();
//                 });
//             });
//
//
//             //Or this if you dont care about deserializing the user:
//             //req.user = req.session.passport.user;
//             //return next();
//
//
//         }
//         else{
//             res.json(401);
//         }
//
//
//
//
//     }
//     else if (req.isAuthenticated()) {
//         return next();
//     }
//     else{
//         // User is not allowed
//         // (default res.forbidden() behavior can be overridden in `config/403.js`)
//         return res.redirect('/login');
//     }
// };

/**
 * isAuthorized
 *
 * @description :: Policy to check if user is authorized with JSON web token
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

module.exports = function (req, res, next) {
  var token;

  if (req.headers && req.headers.authorization) {
    var parts = req.headers.authorization.split(' ');
    if (parts.length == 2) {
      var scheme = parts[0],
        credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    } else {
      return res.json(401, {err: 'Format is Authorization: Bearer [token]'});
    }
  } else if (req.param('token')) {
    token = req.param('token');
    // We delete the token from param to not mess with blueprints
    delete req.query.token;
  } else {
    return res.json(401, {err: 'No Authorization header was found'});
  }

  jwToken.verify(token, function (err, token) {
    if (err) return res.json(401, {err: 'Invalid Token!'});
    req.token = token; // This is the decrypted token or the payload you provided
    next();
  });
};
