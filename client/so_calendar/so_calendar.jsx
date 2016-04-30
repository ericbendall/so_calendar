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
      offset: 0,
    };
  },

  onStoreChange : function(){
    this.setState({
      calendar: Store.getState().calendar,
      calendarIdx: Store.getState().calendarIdx,
    });
  },

  _switchDay: function(isRight) {
    var idx = this.state.calendarIdx;
    if ( (idx === 0 && !isRight) || (this.state.calendar.days.length <= idx && isRight)) {
      return;
    }

    Actions.setCalendarIdx( isRight ? idx + 1 : idx - 1 );
  },

  _handleDirection: function(direction) {
    switch(direction) {
      case 'double-left':
        Actions.setBeginning();
        break;

      case 'left':
        this._switchDay(false);
        break;

      case 'right':
        this._switchDay(true);
        break;

      case 'double-right':
        Actions.setEnd();
        break;
    }
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
              self._switchDay(false);
              handled = true;
              break;

            case 39: // 'ArrowRight'
              self._switchDay(true);
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

  renderDay: function(calendarIdx, dayOffset) {
    var key = 'day-' + calendarIdx;
    var days = this.state.calendar.days;

    if (calendarIdx < 0 || calendarIdx >= days.length) {
      return;
    }

    var leftPercentage = 50 + Math.floor(33* dayOffset);
    var style = {
      left: leftPercentage + '%'
    };

    return <span key={key} className='dayCell' style={style}>
      <Day day={this.state.calendar.days[calendarIdx]} blockingNSFW={true} />
    </span>;
  },

  render : function(){
    var createButtonHandler = (direction) => {
      return () => {this._handleDirection(direction)};
    };

    // {this.renderDay(this.state.calendarIdx - 7, "top center")}
    // {this.renderDay(this.state.calendarIdx + 7, "bottom center")}
    return <div className="so-calendar">
      <div className="calendar">
          {this.renderDay(this.state.calendarIdx - 3, -3)}
          {this.renderDay(this.state.calendarIdx - 2, -2)}
          {this.renderDay(this.state.calendarIdx - 1, -1)}
          {this.renderDay(this.state.calendarIdx, 0)}
          {this.renderDay(this.state.calendarIdx + 1 , 1)}
          {this.renderDay(this.state.calendarIdx + 2 , 2)}
          {this.renderDay(this.state.calendarIdx + 3,  3)}
      </div>

      <div className="controls">
        <span className="direction-btn fa fa-5x fa-angle-double-left" onClick={createButtonHandler('double-left')} />
        <span className="direction-btn fa fa-5x fa-angle-left" onClick={createButtonHandler('left')} />
        <span className="direction-btn fa fa-5x fa-angle-right" onClick={createButtonHandler('right')} />
        <span className="direction-btn fa fa-5x fa-angle-double-right" onClick={createButtonHandler('double-right')} />
      </div>
    </div>
  },
});

module.exports = SoCalendar;
