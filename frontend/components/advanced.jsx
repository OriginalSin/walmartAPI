const React = require('react');

module.exports = React.createClass({
  getInitialState(){
    return({
      advanced: this.props.advanced,
      brandName: this.props.brandName ,
      start: this.props.start ,
      results:  this.props.results ,
      sortedBy:  this.props.sortedBy
    })
  },

  componentWillReceiveProps( props ){
    this.setState({
      advanced: props.advanced,
      brandName:  props.brandName ,
      start:  props.start ,
      results:  props.results ,
      sortedBy:  props.sortedBy
    })
  },

  hideAdvanced(){
    this.props.toggleAdvanced()
  },

  showAdvanced(){
    this.props.toggleAdvanced()
  },

  determineEvent(){
    if( this.state.advanced ){
      this.hideAdvanced();
    }else{
      this.showAdvanced();
    }
  },

  determineButton(){
    if( this.state.advanced ){
      return "Hide Advanced";
    }else{
      return "Show Advanced"
    }
  },

  getMenuStyle(){
    if( this.state.advanced ){
      return({
        width: "70%"
      })
    }else{
      return({
        width: "0px"
      })
    }
  },

  getLinkStyle(){
    if( this.state.advanced ){
      return({
        marginRight: "0%"
      })
    }else{
      return({
        marginRight: "80%"
      })
    }
  },

  render(){
    return(
      <div className = "advanced-menu">
        <div
          ref = "advanced"
          className = "advanced"
          style = { this.getMenuStyle() }>
          <input
            className = "advanced-input advanced-input-small"
            placeholder = "Brand Name"
            value = { this.state.brandName }
            onChange = { this.props.changeBrandName }>
          </input>
          <input
            className = "advanced-input advanced-input-small"
            placeholder = "Result"
            value = { this.state.results }
            onChange = { this.props.changeResults }>
          </input>
          <input
            className = "advanced-input advanced-input-small"
            placeholder = "Start"
            value = { this.state.start }
            onChange = { this.props.changeStart }>
          </input>
          <div className = "inline margin-left-10px margin-right-10px">Sort By:</div>
          <select className = "advaned-input-small" onChange = { this.props.changeSort }>
            <option value = "relevance">Relevance</option>
            <option value = "price">Price</option>
            <option value = "title">Title</option>
            <option value = "bestseller">Bestselling</option>
            <option value = "customerRating">Customer Rating</option>
            <option value = "new">Newest</option>
          </select>
        </div>
        <div
          style = { this.getLinkStyle() }
          className = "advanced-link link"
          placeholder = "# Results"
          onClick = { this.determineEvent }>
          { this.determineButton() }
        </div>
      </div>
    )
  }
})
