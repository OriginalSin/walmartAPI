const AppDispatcher = require('../dispatcher/dispatcher');
const Store = require('flux/utils').Store;
const Constants = require('../constants/constants');
const ProductStore = new Store(AppDispatcher);

ProductStore.products = {};
ProductStore.queries = {};

ProductStore.addProducts = function( products ){
  for (var i = 0; i < products.length; i++) {
    let product = products[i];
    if( !this.products[product.name] ){
      this.products[ product.name ] = product;
    }
  }
},

ProductStore.getProducts = function(){
  return this.products;
},

ProductStore.addQuery = function( query ){
  this.queries[ query ] = true;
},

ProductStore.checkQuery = function( query ){
  if( this.queries[ query ] ){
    return true;
  }else{
    return false;
  }
}

ProductStore.saveLocalStorage = function( product ){
  let name = product.name;
  localStorage.setItem( name, JSON.stringify( product ) );
},

ProductStore.setProducts = function( products ){
  this.products = products;
},

ProductStore.removeProduct = function( product ){
  if( localStorage[product.name] ){
    delete localStorage[product.name]
  }
  delete this.products[product.name];
},

ProductStore.__onDispatch = function( payload ){
  switch( payload.actionType ){
    case Constants.RECEIVENEWPRODUCTS:
    this.addProducts( payload.data );
    this.__emitChange();
    break;
    case Constants.RECEIVELOCALSTORE:
    this.setProducts( payload.data )
    this.__emitChange();
    break;
    case Constants.REMOVEPRODUCT:
    this.removeProduct( payload.data )
    this.__emitChange();
    break;
    case Constants.SAVEPRODUCT:
    this.saveLocalStorage( payload.data );
    this.__emitChange();
    break;
    case Constants.NORESULTS:
    this.__emitChange();
    break;
  }
}

module.exports = ProductStore;
