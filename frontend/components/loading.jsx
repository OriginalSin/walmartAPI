const React = require('react');

module.exports = React.createClass({
  render(){
    return(
      <div className = "overlay">
        <div className = "loading-container">
          <div className = "load-center">
            <div className = "load-tile"></div>
            <div className = "load-tile" style = {{ animationDelay: ".01s", opacity: ".8" }}></div>
            <div className = "load-tile" style = {{ animationDelay: ".02s", opacity: ".7" }}></div>
            <div className = "load-tile" style = {{ animationDelay: ".03s", opacity: ".6" }}></div>
            <div className = "load-tile" style = {{ animationDelay: ".04s", opacity: ".5" }}></div>
            <div className = "load-tile" style = {{ animationDelay: ".05s", opacity: ".4" }}></div>
            <div className = "load-tile" style = {{ animationDelay: ".31s", opacity: ".8", backgroundColor: "green" }}></div>
            <div className = "load-tile" style = {{ animationDelay: ".32s", opacity: ".7", backgroundColor: "green" }}></div>
            <div className = "load-tile" style = {{ animationDelay: ".33s", opacity: ".6", backgroundColor: "green" }}></div>
            <div className = "load-tile" style = {{ animationDelay: ".34s", opacity: ".5", backgroundColor: "green" }}></div>
            <div className = "load-tile" style = {{ animationDelay: ".35s", opacity: ".4", backgroundColor: "green" }}></div>
            <div className = "load-tile" style = {{ animationDelay: ".61s", opacity: ".8", backgroundColor: "blue" }}></div>
            <div className = "load-tile" style = {{ animationDelay: ".62s", opacity: ".7", backgroundColor: "blue" }}></div>
            <div className = "load-tile" style = {{ animationDelay: ".63s", opacity: ".6", backgroundColor: "blue" }}></div>
            <div className = "load-tile" style = {{ animationDelay: ".64s", opacity: ".5", backgroundColor: "blue" }}></div>
            <div className = "load-tile" style = {{ animationDelay: ".65s", opacity: ".4", backgroundColor: "blue" }}></div>
          </div>
        </div>
      </div>
    )
  }
})
