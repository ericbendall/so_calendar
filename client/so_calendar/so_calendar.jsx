var React = require('react');

var Store = require('so_calendar/store.js');
var Actions = require('so_calendar/actions.js');
var getIsBrowser = require('so_calendar/getIsBrowser.js');

var Day = require('./day/day.jsx');


var SoCalendar = React.createClass({
  mixins : [Store.mixin()],

  getInitialState: function() {
    return {
      calendar: Store.getState().calendar,
      calendarIdx: Store.getState().calendarIdx,
      lastIdx: Store.getState().lastIdx
    };
  },

  onStoreChange : function(){
    //localStorage.setItem('test', JSON.stringify(Store.getState()));
    this.setState({
      calendar: Store.getState().calendar,
      calendarIdx: Store.getState().calendarIdx,
      lastIdx: Store.getState().lastIdx
    });
  },

  componentDidMount: function(args) {
    var self = this;
    Actions.init();

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
    var key = 'day-' + calendarIdx;
    return <span key={key} className={position + ' dayCell'}>
      <Day day={this.state.calendar.days[calendarIdx]} blockingNSFW={true} />
    </span>;
  },

  render : function(){
    // {this.renderDay(this.state.calendarIdx - 7, "top center")}
    // {this.renderDay(this.state.calendarIdx + 7, "bottom center")}
    // {this.renderDay(this.state.calendarIdx - 1, "middle left")}
    // {this.renderDay(this.state.calendarIdx + 1 , "middle right")}
    return <div className="so-calendar">
      <div className="calendar">
          {this.renderDay(this.state.calendarIdx, "middle center")}
      </div>
    </div>
  },
});

module.exports = SoCalendar;
