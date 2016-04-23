var React = require('react');
var tweenState = require('react-tween-state');

var Store = require('so_calendar/store.js');
var Actions = require('so_calendar/actions.js');
var getIsBrowser = require('so_calendar/getIsBrowser.js');

var Day = require('./day/day.jsx');

var DAY_SIZE_PX = 600;
var CALENDAR_SIZE_PX = 800;
var DAY_MARGIN_PX = 10;

var SoCalendar = React.createClass({
  mixins : [Store.mixin(), tweenState.Mixin],

  getInitialState: function() {
    return {
      calendar: Store.getState().calendar,
      calendarIdx: Store.getState().calendarIdx,
      offset: 0,
    };
  },

  onStoreChange : function(){
    //localStorage.setItem('test', JSON.stringify(Store.getState()));
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

    var maxOffset = DAY_SIZE_PX + DAY_MARGIN_PX;
    this.tweenState('offset', {
      easing: tweenState.easingTypes.easeInOutQuad,
      duration: 500,
      beginValue: isRight ? maxOffset : 0 - maxOffset,
      endValue: 0
    });
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
              //Actions.setCalendarIdx(self.state.calendarIdx - 1);
              self._switchDay(false);
              handled = true;
              break;

            case 39: // 'ArrowRight'
              //Actions.setCalendarIdx(self.state.calendarIdx + 1);
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
    var tweenOffset = this.getTweeningValue('offset');
    var left = (CALENDAR_SIZE_PX / 2) - (DAY_SIZE_PX /2); // center's left with no offset

    left += dayOffset + tweenOffset;
    if (calendarIdx < 0 || calendarIdx >= days.length) {
      return;
    }

    var style = {
      left: left + 'px'
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
    var dayCellOffset = DAY_SIZE_PX + DAY_MARGIN_PX;
    return <div className="so-calendar">
      <div className="calendar">
          {this.renderDay(this.state.calendarIdx - 2, -2 * dayCellOffset)}
          {this.renderDay(this.state.calendarIdx - 1, -1 * dayCellOffset)}
          {this.renderDay(this.state.calendarIdx, 0)}
          {this.renderDay(this.state.calendarIdx + 1 , dayCellOffset)}
          {this.renderDay(this.state.calendarIdx + 2 , 2 * dayCellOffset)}
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
