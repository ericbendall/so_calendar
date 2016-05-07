var React = require('react');
var Actions = require('so_calendar/actions.js');
var Day = require('../day/day.jsx');

var Calendar = React.createClass({

  getDefaultProps: function() {
    return {
      calendar: { days: []},
      calendarIdx: 0
    };
  },

  componentDidMount: function(args) {
    // Touch events
    var Hammer = require('hammerjs');
    var calendarElement = document.getElementById('calendar');
    var calendarHammer = new Hammer(calendarElement);
    calendarHammer.on('swipe', (evt) => {
      // By default, Hammer on recognizes horizontal swipes
      if (evt.deltaX < 0) {
        Actions.forwardOneDay();
      } else {
        Actions.backOneDay();
      }
    });
  },

  renderDay: function(dayOffset) {
    const calendarIdx = this.props.calendarIdx + dayOffset;
    const days = this.props.calendar.days;
    const key = 'day-' + calendarIdx;
    const className = 'dayCell cellOffset_' + dayOffset;

    if (calendarIdx < 0 || calendarIdx >= days.length) {
      return;
    }

    return <span key={key} className={className}>
      <Day day={this.props.calendar.days[calendarIdx]} blockingNSFW={true} />
    </span>;
  },

  render : function(){
    return <div id="calendar" className="calendar">
      {this.renderDay(-3)}
      {this.renderDay(-2)}
      {this.renderDay(-1)}
      {this.renderDay(0)}
      {this.renderDay(1)}
      {this.renderDay(2)}
      {this.renderDay(3)}
    </div>
  },
});

module.exports = Calendar;
