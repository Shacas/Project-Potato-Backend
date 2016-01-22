/**
* Profile.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    // User's contact name
    name: {
      type: 'string',
    },

    // Gravatar url
    gravatar: {
      type: 'string'
    },

    address: {
      type: 'string'
    },

    phone: {
      type: 'string',
      defaultsTo: '613-000-0000'
    },

    user: {
      model: 'User'
    }

  }
};
