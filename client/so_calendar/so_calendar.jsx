var React = require('react');

var Store = require('so_calendar/store.js');
var Actions = require('so_calendar/actions.js');
var getIsBrowser = require('so_calendar/getIsBrowser.js');

var Day = require('./day/day.jsx');


var SoCalendar = React.createClass({
  mixins : [Store.mixin()],

  getInitialState: function() {
    return {
      month: Store.getState().currentMonth,
      calendarIdx: Store.getState().calendarIdx,
      lastIdx: Store.getState().lastIdx
    };
  },

  onStoreChange : function(){
    //localStorage.setItem('test', JSON.stringify(Store.getState()));
    this.setState({
      month: Store.getState().currentMonth,
      calendarIdx: Store.getState().calendarIdx,
      lastIdx: Store.getState().lastIdx
    });
  },

  componentDidMount: function(args) {
    var self = this;
    try {
      if (getIsBrowser() && window) {
        window.onkeyup = function(args) {
          var handled = false;
          switch(args.keyCode) {
            case 37: // ArrowLeft
              Actions.setCalendarIdx(self.state.calendarIdx - 1);
              handled = true;
              break;

            case 39: // 'ArrowRight'
              Actions.setCalendarIdx(self.state.calendarIdx + 1);
              handled = true;
              break;

            default:
              break;
          }
          return handled;
        };
      }
    } catch (e) {
      ; // Do nothing, just eat the error
    }

  },

  renderDay: function(calendarIdx, position) {
    var weekIdx = Math.floor(calendarIdx / 7);
    var dayIdx = calendarIdx % 7;
    var label = Store.getDayOfWeek(dayIdx) + ': ' + this.state.month[weekIdx][dayIdx].label;
    var key = this.state.month[weekIdx][dayIdx].id;
    return <span key={key} className={position + ' dayCell'}>
      <Day dayOfWeek={label} />
    </span>;
  },

  render : function(){
    // {this.renderDay(this.state.calendarIdx - 7, "top center")}
    // {this.renderDay(this.state.calendarIdx + 7, "bottom center")}
    return <div className="so-calendar">
      <div className="calendar">
          {this.renderDay(this.state.calendarIdx - 1, "middle left")}
          {this.renderDay(this.state.calendarIdx, "middle center")}
          {this.renderDay(this.state.calendarIdx + 1 , "middle right")}
      </div>
    </div>
  },
});

module.exports = SoCalendar;
