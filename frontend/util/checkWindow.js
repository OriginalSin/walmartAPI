let $ = require('jquery');
function checkWindow(){
  this.elements = [];
  this.lastElement = {};
}

checkWindow.prototype.registerElement = function( element, fun ){
  let toReg = {
    element: element,
    func: fun
  }
  this.elements.push( toReg );
}

checkWindow.prototype.unRegisterElement = function( element ){
  for (var i = 0; i < this.elements.length; i++) {
    let el = this.elements[i];
    if( this.elements[i].element === element){
      this.elements.splice( i, 1 );
    }
  }
}

checkWindow.prototype.run = function(){
  let top = window.scrollY;
  for( var i = 0 ; i < this.elements.length; i++ ){
    let el = this.elements[i];
    let elTop = $(el.element).offset().top;
    if( top > elTop - 0){
      el.func( el.element );
      this.elements.splice( i, 1 );
    }
  }
  if( top > $(document).height() - ( $(window).height() + 100 ) ){
    this.infiniteScroll();
  }
}

checkWindow.prototype.registerLast = function( element ){
  this.lastElement = element;
}

checkWindow.prototype.infiniteScroll = function(){
  console.log(this.lastElement);
  if( this.lastElement.date ){
    this.lastElement.func( {
      filter: this.lastElement.filter,
      date: this.lastElement.date
     });
  }
}

module.exports = checkWindow;
