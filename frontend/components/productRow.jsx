const React = require('react');
const Walmart = require('../actions/walmart');

module.exports = React.createClass({
  getInitialState(){
    return({
      product: this.props.product,
      brandName: this.getBrandName( this.props.product ),
      original: this.getBrandName( this.props.product ),
      index: this.props.index,
      saved: true
    })
  },

  componentWillReceiveProps( props ){
    this.setState({
      product: props.product,
      index: props.index,
      brandName: this.getBrandName( props.product ),
      original: this.getBrandName( props.product ),
      saved: true
    });
  },

  getMSRP(){
    if( this.state.product.msrp ){
      return "$" + this.state.product.msrp
    }else{
      return "none"
    }
  },

  getRating(){
    if( this.state.product.customerRatingImage ){
      return(
        <div className = "review-image" style = {{ backgroundImage: `url('${this.state.product.customerRatingImage}')` }}></div>
      )
    }else{
      return(
        <div className = "review-image"> No Rating Available </div>
      )
    }
  },

  assignBrandName( e ){
    if( e.target.className !== "button" && this.state.brandName === "" ){
      this.setState({ saved: false, brandName: this.state.product.brandName })
    }else if( e.target.className !== "button" ){
      this.setState({ saved: false })
    }
  },

  getBrandName( product ){
    if( product && product.brand ){
      return product.brand;
    }else{
      return "";
    }
  },

  getId(){
    return( `product-${this.state.index}` )
  },

  changeBrandName( e ){
      this.setState({ brandName: e.target.value })
  },

  save(){
    this.state.product.brand = this.state.brandName;
    Walmart.saveProduct( this.state.product );
    this.setState({ saved: true, original: this.state.brandName },
    function(){
    });
  },

  button(){
    if( this.state.original !== this.state.brandName || !this.state.saved ){
      return(
        <div className = "button" style = {{ float: "left", marginLeft: "20px" }} onClick = { this.save }>Save</div>
      )
    }
  },

  input(){
    if( this.state.saved ){
      return(
        <div className = "col-md-8"> { this.state.brandName } </div>
      )
    }else{
      return(
        <input value = { this.state.brandName } className = "col-md-8" onChange = { this.changeBrandName }></input>
      )
    }
  },

  remove(){
    Walmart.removeProduct( this.state.product )
  },

  nav(){
    let url = this.state.product.productUrl;
    var win = window.open(url, '_blank');
    win.focus();
  },

  render(){
    return(
      <div className = "centered-wide product-head product-row border-bottom" id = { this.getId() }>
        <div className = "product-row col light col-md-3 image-name">
          <div className = "thumbnail-image" style = {{ backgroundImage: `url('${this.state.product.thumbnailImage}')` }}></div>
          <div className = "product-name">{ this.state.product.name }</div>
          <div className = "product-link" onClick = { this.nav }></div>
        </div>
        <div className = "product-row col light col-md-3" onClick = { this.assignBrandName }>
          {
            this.input()
          }
          {
            this.button()
          }
          </div>
        <div className = "product-row col light col-md-2">{ this.state.product.categoryPath }</div>
        <div className = "product-row col light width-5">${ this.state.product.salePrice }</div>
        <div className = "product-row col light width-5">{ this.getMSRP() }</div>
        <div className = "product-row col light width-5 no-border">
          {
            this.getRating()
          }
          <div> { this.state.product.customerRating } </div>
          <div className = "product-x" onClick = { this.remove }> X </div>
        </div>
      </div>
    )
  }
})
