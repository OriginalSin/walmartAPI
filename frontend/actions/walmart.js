const GetAllProducts = require("../util/getAllProducts");
const Constants = require('../constants/constants');
const Dispatcher = require('../dispatcher/dispatcher');

module.exports = {
  queryProduct: function( query, brand, sort, start, results ){
    GetAllProducts.startQuery( query, brand, sort, start, results, this.receiveProducts );
  },

  checkLocalStorage(){
      let keys = Object.keys( localStorage );
      let result = {};
      for (var i = 0; i < keys.length; i++) {
        let key = keys[i];
        let product = JSON.parse( localStorage[key] );
        result[ product.name ] = product;
      }
      this.receiveLocalStore( result );
  },

  saveProduct: function( product ){
    Dispatcher.dispatch({
      actionType: Constants.SAVEPRODUCT,
      data: product
    })
  },

  receiveProducts: function( query, data ){
    Dispatcher.dispatch({
      actionType: Constants.RECEIVENEWPRODUCTS,
      query: query,
      data: data
    })
  },

  removeProduct: function( product ){
    Dispatcher.dispatch({
      actionType: Constants.REMOVEPRODUCT,
      data: product
    })
  },

  receiveLocalStore: function( data ){
    Dispatcher.dispatch({
      actionType: Constants.RECEIVELOCALSTORE,
      data: data
    })
  }
}
