var React = require('react');
var Day = React.createClass({

  getInitialProps: function() {
    return {
      dayOfWeek: "Monday"
    }
  },

  render: function(){
    return <div className="day"> {this.props.dayOfWeek} </div>
  }

});

module.exports = Day;
