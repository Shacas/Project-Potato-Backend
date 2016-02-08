/**
* Order.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    orderNumber: {
      type: 'string',
      unique: true,
      required: true,
      defaultsTo: function(){
        return uuid.v4();
      }
    },

    products: {
      collection: 'Product',
      via: 'orders'
    },

    user: {
      model: 'User'
    },

    time: {
      type: 'date',
      required: true,
      defaultsTo: new Date()
    },

    status: {
      type: 'STRING', // PREPARE / PAID / SHIPPING-DELIVERYING / DONE / CANCEL / SOLD-OUT
      enum: [ 'PREPARE', 'PAID', 'SHIPPING/DELIVERYING', 'DONE', 'CANCEL', 'SOLD-OUT' ],
      defaultsTo: 'PREPARE'
    }

  }
};
