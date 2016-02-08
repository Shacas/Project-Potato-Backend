/**
* Product.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    // Product barcode 条形码
    barcode: {
      type: 'string',
      unique: true
    },

    // Product number 产品编码
    inventoryNumber: {
      type: 'string',
      unique: true
    },

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

    unit: {
      type: 'string',
      required: true
    },

    image: {
      type: 'integer'
    },

    categories: {
      collection: 'Category',
      via: 'products'
    },

    orders: {
      collection: 'Order',
      via: 'products'
    },

    provider: {
      model: 'Provider'
    }


  },

  afterCreate: function(product, cb) {
    Provider.create({
      product: product.id,
    })
    .exec(function(err, provider) {
      if (err){
        cb();
      }

      Product.update(product.id, {provider: provider.id}).exec(function(err, user) {
        if (err){
          cb();
        }else{
          cb();
        }
      });

    });
  }
};
