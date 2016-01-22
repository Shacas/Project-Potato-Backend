/**
* Product.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },

    desc: {
      type: 'text'
    },

    price: {
      type: 'integer',
      required: true
    },

    image: {
      type: 'integer'
    },

    categories: {
      collection: 'Category',
      via: 'products'
    }

  }
};

