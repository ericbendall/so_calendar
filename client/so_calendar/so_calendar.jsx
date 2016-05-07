var React = require('react');
var Calendar = require('./calendar/calendar.jsx');

var Store = require('so_calendar/store.js');
var Actions = require('so_calendar/actions.js');

var SoCalendar = React.createClass({
  mixins : [Store.mixin()],

  getInitialState: function() {
    return {
      calendar: Store.getState().calendar,
      calendarIdx: Store.getState().calendarIdx
    };
  },

  onStoreChange : function(){
    this.setState({
      calendar: Store.getState().calendar,
      calendarIdx: Store.getState().calendarIdx,
    });
  },

  _handleDirection: function(direction) {
    switch(direction) {
      case 'double-left':
        Actions.setBeginning();
        break;

      case 'left':
        Actions.backOneDay();
        break;

      case 'right':
        Actions.forwardOneDay();
        break;

      case 'double-right':
        Actions.setEnd();
        break;
    }
  },

  componentDidMount: function(args) {
    var self = this;
    Actions.init();

    // Key Events
    try {
      window.onkeyup = function(args) {
        var handled = false;
        switch(args.keyCode) {
          case 37: // ArrowLeft
            Actions.backOneDay();
            handled = true;
            break;

          case 39: // 'ArrowRight'
            Actions.forwardOneDay();
            handled = true;
            break;

          default:
            break;
        }
        return handled;
      };
    } catch (e) {
      ; // Do nothing, just eat the error
    }
  },

  render : function(){
    var createButtonHandler = (direction) => {
      return () => {this._handleDirection(direction)};
    };

    return <div className="so-calendar">
      <Calendar calendarIdx={this.state.calendarIdx} calendar={this.state.calendar} />
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
