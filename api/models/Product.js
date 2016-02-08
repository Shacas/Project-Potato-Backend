/**
* Product.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

// 规格
// 进货价
// 条形码（ID）
// 用户：代号？产品：编码
// 置顶，推荐？排列：牌子
// 订单编号... 

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
