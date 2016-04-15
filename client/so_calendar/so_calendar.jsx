var React = require('react');

var Day = require('./day/day.jsx');

var createMonth = function(monthName, numDays, weekStart) {
  var month = [[]];
  var curWeekIx = 0;

  var gridSize = (numDays + weekStart) + (7 - ((numDays + weekStart)%7));
  for (var ix = 0; ix < gridSize; ix ++) {
    if (month[curWeekIx].length === 7) {
      curWeekIx++;
      month.push([]);
    }

    var day = {id: ix};
    if (ix < weekStart || ix >= weekStart + numDays){
      day.label = 'Blank';
    } else {
      day.label = monthName + ' ' + (ix + 1 - weekStart);
    }
    month[curWeekIx].push(day);
  }

  return month;
};

var DayOfWeek = [
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

var SoCalendar = React.createClass({

  getDefaultProps: function(){
    return {
      month: createMonth('March', 31, 1),
      calendarIdx: 15,
      lastIdx: 14
    };
  },

  renderDay: function(calendarIdx, position) {
    var weekIdx = Math.floor(calendarIdx / 7);
    var dayIdx = calendarIdx % 7;
    var label = DayOfWeek[dayIdx] + ': ' + this.props.month[weekIdx][dayIdx].label;
    var key = this.props.month[weekIdx][dayIdx].id;
    return <span key={key} className={position + ' dayCell'}>
      <Day dayOfWeek={label} />
    </span>;
  },

  render : function(){

    return <div className="so-calendar">
      <div className="calendar">
          {this.renderDay(this.props.calendarIdx - 7, "top center")}
          {this.renderDay(this.props.calendarIdx - 1, "middle left")}
          {this.renderDay(this.props.calendarIdx, "middle center")}
          {this.renderDay(this.props.calendarIdx + 1 , "middle right")}
          {this.renderDay(this.props.calendarIdx + 7, "bottom center")}
      </div>
    </div>
  },
});

module.exports = SoCalendar;
