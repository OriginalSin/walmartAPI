const React = require('react');
const Walmart = require('../actions/walmart')
const Loading = require('./loading');
const Head = require('./head')
const ProductStore = require('../stores/productStore');
const Table = require('./table') ;
const $ = require('jquery');

var Index = React.createClass({
  getInitialState(){
    return {
      start: 1,
      query: "Query (required)",
      advanced: false,
      brandName: "",
      start: "",
      results: "",
      sortedBy: "relevance",
      products: {},
    }
  },

  componentDidMount(){
    this.list = ProductStore.addListener( this.__change );
    Walmart.checkLocalStorage();
    window.onscroll = this.checkTop;
  },

  checkTop(){
    let firstRow = document.getElementById("product-0");
    let sortList = document.getElementById("sort-list");
    let trigger = 100;
    let top = document.body.scrollTop;
    if( top > trigger ){
      sortList.style.position = "fixed";
      sortList.style.top = "100px";
      sortList.style.zIndex = "9";
      firstRow.style.marginTop = "100px";
    }else{
      firstRow.style.marginTop = "0px";
      sortList.style.position = "initial";
    }
  },

  checkQuery(){
    if( !ProductStore.checkQuery( this.state.query ) && this.state.query !== "" ){
      let start, results;
      if( this.state.start === "" ){
        start = 1;
      }else{
        start = this.state.start
      }
      if( this.state.results === "" ){
        results = 25;
      }else{
        results = this.state.results
      }
      Walmart.queryProduct( this.state.query, this.state.brandName, this.state.sortedBy, start, results );
      this.setState({ loading: true })
    }
  },

  __change(){
    let products = ProductStore.getProducts();
    this.setState({
      products: products,
      loading: false
    })
  },


  loading(){
    if( this.state.loading ){
      return(
        <Loading>
        </Loading>
      )
    }else{
      return this.table();
    }
  },

  toggleAdvanced(){
    this.setState({ advanced: !this.state.advanced })
  },

  changeQuery( e ){
    this.setState({ query: e.target.value });
  },

  changeSort( e ){
    this.setState({ sortedBy: e.target.value });
  },

  changeBrandName( e ){
    this.setState({ brandName: e.target.value })
  },

  changeStart( e ){
    this.setState({ start: e.target.value })
  },

  changeResults( e ){
    this.setState({ results: e.target.value });
  },

  table(){

  },

  render(){
    return(
      <div>
        <Head
          changeSort = { this.changeSort }
          advanced = { this.state.advanced }
          toggleAdvanced = { this.toggleAdvanced }
          checkQuery = { this.checkQuery }
          brandName = { this.state.brandName }
          changeStart = { this.changeStart }
          changeResults = { this.changeResults }
          changeBrandName = { this.changeBrandName }
          start = { this.state.start }
          results = { this.state.results }
          sortedBy = { this.state.sortedBy }
          change = { this.changeQuery }>
        </Head>
        <Table products = { this.state.products }></Table>
        {
          this.loading()
        }
      </div>
    )
  }
})

module.exports = Index
