const $ = require('jquery');
module.exports = {
  callback: {},
  targetLength: 0,
  data: [],

  addData: function( data ){
    this.data = this.data.concat( data.items );
  },

  startQuery: function( query, brand, start, results, callback, noResults ){
    this.callback = callback;
    this.noResults = noResults;
    this.targetLength = parseInt( results );
    this.start = parseInt( start );
    if( results <= 25 ){
      this.sendRequest( query, brand, start, results, this.sendRequest.bind( this ) );
    }else{
      this.sendRequest( query, brand, start, 25, this.sendRequest.bind( this ) );
    }
  },

  executeCallback: function( query ){
    this.callback( query, this.data.slice(0) );
    this.data = [];
    this.callback = {};
    this.targetLength = 0;
  },

  sendRequest: function( query, brand, index, results, callback ){
    if( results <= 0 ){
      this.executeCallback( query );
    }else{
      $.ajax({
        url: `http://api.walmartlabs.com/v1/search?apiKey=4fb3kd3w5k448e4he4z78ytc&query=${query}&start=1&numItems=25&responseGroup=full&facet=on&facet.filter=brand:${brand}`,
        dataType: "JSONP",
        success: function( data ){
          if( !data.errors && data.totalResults !== 0 ){
            this.addData.bind( this )( data );
            let remainder = ( this.start + this.targetLength ) - ( data.start + data.items.length );
            if( remainder > 25  ){
              callback( query, brand, index + this.data.length, 25, this.sendRequest.bind( this ) )
            }else{
              callback( query, brand, index + this.data.length, remainder, this.sendRequest.bind( this ));
            }
          }else if( data.totalResults === 0 ){
            this.executeCallback(query);
          }else{
            debugger
          }
        }.bind( this )
      })
    }
  }
}
