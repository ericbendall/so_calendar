var React = require('react');

var Day = require('./day/day.jsx');


var SoCalendar = React.createClass({

  renderDay: function(dayOfWeek, position) {
    return <span className={position + ' dayCell'}>
      <Day dayOfWeek={dayOfWeek} />
    </span>;
  },

  render : function(){

    return <div className="so-calendar">
      <div className="calendar">
          {this.renderDay("Friday", "top center")}
          {this.renderDay("Saturday", "middle left")}
          {this.renderDay("Sunday", "middle center")}
          {this.renderDay("Monday", "middle right")}
          {this.renderDay("Tuesday", "bottom center")}
      </div>
    </div>
  },
});

module.exports = SoCalendar;
