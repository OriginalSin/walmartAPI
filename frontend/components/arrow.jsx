const React = require('react');

module.exports = React.createClass({
  getInitialState(){
    return({
      down: this.props.down
    })
  },

  componentWillReceiveProps( props ){
    this.setState({ down: props.down })
  },

  getArrow(){
    if( this.state.down ){
      return "arrow-down"
    }else{
      return "arrow-up"
    }
  },

  render(){
    return(
      <div className = { this.getArrow() }>
      </div>
    )
  }
})
