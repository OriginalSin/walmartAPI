const React = require('react');
const Advanced = require('./advanced');

module.exports = React.createClass({
  getInitialState(){
    return({
      query: this.props.query,
      advanced: this.props.advanced,
      brandName: this.props.brandName ,
      start: this.props.start ,
      results:  this.props.results ,
      sortedBy:  this.props.sortedBy
    })
  },

  componentWillReceiveProps( props ){
    this.setState({
      query: props.query,
      advanced: props.advanced,
      brandName:  props.brandName ,
      start:  props.start ,
      results:  props.results ,
      sortedBy:  props.sortedBy
    })
  },

  render(){
    return(
      <div className = "head centered-wide">
        <input
          className = "col-md-2"
          placeholder = "Query"
          onChange = { this.props.change }
          value = { this.state.query }>
        </input>
        <div className = "button search-button" onClick = { this.props.checkQuery }>Add Products</div>
        <Advanced
          changeBrandName = { this.props.changeBrandName }
          changeResults = { this.props.changeResults }
          changeStart = { this.props.changeStart }
          toggleAdvanced = { this.props.toggleAdvanced }
          advanced = { this.state.advanced }
          brandName = { this.state.brandName }
          start = { this.state.start }
          results = { this.state.results }
          sortedBy = { this.state.sortedBy }>
        </Advanced>
      </div>
    )
  }
})
