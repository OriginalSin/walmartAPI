const React = require('react');
const ProductRow = require('./productRow')
const Arrow = require('./arrow');

module.exports = React.createClass({
  getInitialState(){
    return({
      products: this.props.products,
      sort: "NamesAsc",
      filter: ""
    })
  },

  componentWillReceiveProps( props ){
    this.setState({
      products: props.products
    })
  },

  getIndex(){
    if( this.state.products.length < 25 ){
      return this.state.products.length
    }else{
      return 25
    }
  },

  getProductCount(){
    return Object.keys(this.state.products).length
  },

  sortByName( names ){
    names = names.sort();
    return names;
  },

  sortByCat( names ){
    let result = {};
    let newNames =[]
    let catNames;
    for (var i = 0; i < names.length; i++) {
      let name = names[i];
      let product = this.state.products[ name ];
      let cat = product.categoryPath;
      if( !result[ cat ] ){
        result[cat] = [];
      }else{
        result[cat].push( product );
      }
    }
    catNames = Object.keys( result ).sort();
    for (var i = 0; i < catNames.length; i++) {
      let cat = catNames[i];
      for (var j = 0; j < result[cat].length; j++) {
        let product = result[cat][j];
        let name = product.name;
        newNames.push( name )
      }
    }
    return newNames;
  },

  sort( names, property, num ){
    let result = {};
    let newNames =[]
    let namesByProp;
    for (var i = 0; i < names.length; i++) {
      let name = names[i];
      let product = this.state.products[ name ];
      let prop = product[property];
      if( num && typeof prop === "string" ){
        prop = parseFloat( prop );
      }
      if( prop === undefined && num ){
        prop = 0;
      }else if( prop === undefined ){
        prop = "0";
      }
      if( !result[ prop ] ){
        result[prop] = [];
        result[prop].push( product )
      }else{
        result[prop].push( product );
      }
    }
    if( num ){
      namesByProp = Object.keys( result ).sort(function(a, b){return a - b});
    }else{
      namesByProp = Object.keys( result ).sort();
    }
    for (var i = 0; i < namesByProp.length; i++) {
      let prop = namesByProp[i];
      for (var j = 0; j < result[prop].length; j++) {
        let product = result[prop][j];
        let name = product.name;
        newNames.push( name )
      }
    }
    return newNames;
  },

  sortByBrand( names ){
    let last = {};
    let brands = {};
    let newNames = [];
    for (var i = 0; i < names.length; i++) {
      let name = names[i];
      let product = this.state.products[name];
      let brand = product.brand;
      if( !brand ){
        last[ name ] = product;
      }else{
        if( brands[ brand ] ){
          brands[ brand ].push( product );
        }else{
          brands[ brand ] = [];
          brands[ brand ].push( product );
        }
      }
    }
    let brandNames = Object.keys( brands ).sort();
    let lastNames = Object.keys( last ).sort();
    for (var i = 0; i < brandNames.length; i++) {
      let brandName = brandNames[i];
      let products = brands[brandName];
      for (var j = 0; j < products.length; j++) {
        let product = products[j];
        newNames.push( product.name );
      }
    }
    return newNames.concat( lastNames );
  },

  filter( names ){
    if( this.state.filter ){
      let filter = this.state.filter;
      let results = [];
      for (var i = 0; i < names.length; i++) {
        let name = names[i];
        if( name.toLowerCase().indexOf( filter.toLowerCase() ) >= 0 ){
          results.push( name )
        }
      }
      return results;
    }else{
      return names;
    }
  },

  getNames(){
    let names = Object.keys( this.state.products );
    names = this.filter( names );
    if( !this.state.sort || this.state.sort === "NamesAsc"  ){
      return(
        this.sortByName( names )
      )
    }else if( this.state.sort === "NamesDesc" ){
      names = this.sortByName( names );
      return(
        names.reverse()
      )
    }else if( this.state.sort === "BrandNameAsc" ){
      names = this.sortByBrand( names );
      return names;
    }else if( this.state.sort === "BrandNameDesc" ){
      names = this.sortByBrand( names );
      names = names.reverse();
      return names;
    }else if( this.state.sort === "CategoryAsc" ){
      names = this.sort( names, "categoryPath" );
      return names;
    }else if( this.state.sort === "CategoryDesc" ){
      names = this.sort( names, "categoryPath" );
      names = names.reverse();
      return names;
    }else if( this.state.sort === "PriceAsc" ){
      names = this.sort( names, "salePrice", true );
      names = names.reverse();
      return names;
    }else if( this.state.sort === "PriceDesc" ){
      names = this.sort( names, "salePrice", true );
      return names;
    }else if( this.state.sort === "MSRPAsc" ){
      names = this.sort( names, "msrp", true );
      return names;
    }else if( this.state.sort === "MSRPDesc" ){
      names = this.sort( names, "msrp", true );
      names = names.reverse();
      return names;
    }else if( this.state.sort === "ReviewAsc" ){
      names = this.sort( names, "customerRating", true );
      return names;
    }else if( this.state.sort === "ReviewDesc" ){
      names = this.sort( names, "customerRating", true );
      names = names.reverse();
      return names;
    }
  },

  products(){
    let names = this.getNames();
    if( names.length > 0 ){
      return names.map(
        function( name, index ){
          return(
            <ProductRow key = { index } index = { index } product = { this.state.products[ name ] }></ProductRow>
          )
        }.bind( this )
      );
    }
  },

  getArrow( tab ){
    if( this.state.sort === "NamesAsc" && tab === "product" ){
      return(
        <Arrow down = { false }></Arrow>
      )
    }else if( this.state.sort === "NamesDesc" && tab === "product" ){
      return(
        <Arrow down = { true }></Arrow>
      )
    }else if( this.state.sort === "BrandNameAsc" && tab === "brand" ){
      return(
        <Arrow down = { false }></Arrow>
      )
    }else if( this.state.sort === "BrandNameDesc" && tab === "brand" ){
      return(
        <Arrow down = { true }></Arrow>
      )
    }else if( this.state.sort === "CategoryAsc" && tab === "category" ){
      return(
        <Arrow down = { false }></Arrow>
      )
    }else if( this.state.sort === "CategoryDesc" && tab === "category" ){
      return(
        <Arrow down = { true }></Arrow>
      )
    }else if( this.state.sort === "PriceAsc" && tab === "price" ){
      return(
        <Arrow down = { false }></Arrow>
      )
    }else if( this.state.sort === "PriceDesc" && tab === "price" ){
      return(
        <Arrow down = { true }></Arrow>
      )
    }else if( this.state.sort === "MSRPAsc" && tab === "MSRP" ){
      return(
        <Arrow down = { false }></Arrow>
      )
    }else if( this.state.sort === "MSRPDesc" && tab === "MSRP" ){
      return(
        <Arrow down = { true }></Arrow>
      )
    }else if( this.state.sort === "ReviewAsc" && tab === "review" ){
      return(
        <Arrow down = { false }></Arrow>
      )
    }else if( this.state.sort === "ReviewDesc" && tab === "review" ){
      return(
        <Arrow down = { true }></Arrow>
      )
    }
  },

  toggleProduct(){
    if( this.state.sort === "NamesAsc" ){
      this.setState({ sort: "NamesDesc" })
    }else{
      this.setState({ sort: "NamesAsc" })
    }
  },

  toggleCategory(){
    if( this.state.sort === "CategoryAsc" ){
      this.setState({ sort: "CategoryDesc" })
    }else{
      this.setState({ sort: "CategoryAsc" })
    }
  },

  togglePrice(){
    if( this.state.sort === "PriceAsc" ){
      this.setState({ sort: "PriceDesc" })
    }else{
      this.setState({ sort: "PriceAsc" })
    }
  },

  toggleMSRP(){
    if( this.state.sort === "MSRPAsc" ){
      this.setState({ sort: "MSRPDesc" })
    }else{
      this.setState({ sort: "MSRPAsc" })
    }
  },

  toggleReview(){
    if( this.state.sort === "ReviewAsc" ){
      this.setState({ sort: "ReviewDesc" })
    }else{
      this.setState({ sort: "ReviewAsc" })
    }
  },

  toggleBrand(){
    if( this.state.sort === "BrandNameAsc" ){
      this.setState({ sort: "BrandNameDesc" });
    }else{
      this.setState({ sort: "BrandNameAsc" });
    }
  },

  changeFilter( e ){
    this.setState({ filter: e.target.value });
  },

  render(){
    return(
      <div>
        <div className = "centered-wide filters">
          <div className = "col-md-5">
            <div className = "filter-tag light">Search:</div>
            <input className = "filter-input" onChange = { this.changeFilter } value = { this.state.filter }></input>
          </div>
          <div className = "ml-3 col-xs-offset-5 grey italic">
            Showing { this.getProductCount() } of { this.getProductCount() }
          </div>
        </div>
        <div className = "centered-wide product-head drop-shadow product-tabs" id = "sort-list">
          <div className = "col col-md-3" onClick = { this.toggleProduct }>Product
            {
              this.getArrow( "product" )
            }
           </div>
          <div className = "col col-md-3" onClick = { this.toggleBrand }>Brand Name
            {
              this.getArrow( "brand" )
            }
          </div>
          <div className = "col col-md-2" onClick = { this.toggleCategory } >Category
            {
              this.getArrow( "category" )
            }
          </div>
          <div className = "col width-5" onClick = { this.togglePrice }>Price
            {
              this.getArrow( "price" )
            }
          </div>
          <div className = "col width-5" onClick = { this.toggleMSRP }>MSRP
            {
              this.getArrow( "MSRP" )
            }
          </div>
          <div className = "col width-5 no-border" onClick = { this.toggleReview }>Reviews
            {
              this.getArrow( "review" )
            }
          </div>
        </div>
        {
          this.products()
        }
      </div>
    )
  }
})
