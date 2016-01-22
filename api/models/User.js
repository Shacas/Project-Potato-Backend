/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    // Username
    username: {
      type: 'string',
      required: true,
      unique: true
    },

    // User's Unique email address
    email: {
      type: 'email',
      required: true,
      unique: true
    },

    // The encrypted password
    password: {
      type: 'string',
      minLength: 6,
      required: true
    },

    userInfo: {
      model: 'Profile'
    },

    // Last logged in taimestamp
    lastLoggedIn: {
      type: 'date',
      required: true,
      defaultsTo: new Date(0)
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }

  },

  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          console.log(err);
          cb(err);
        } else {
          user.password = hash;
          cb();
        }
      });
    });
  },

  afterCreate: function(user, cb) {
    Profile.create({
      user: user.id,
    })
    .exec(function(err, profile) {
      if (err){
        cb();
      }

      User.update(user.id, {userInfo: profile.id}).exec(function(err, user) {
        if (err){
          cb();
        }else{
          cb();
        }
      });

    });
  }



};

