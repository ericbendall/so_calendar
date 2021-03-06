var flux = require('pico-flux');
var fetch = require('isomorphic-fetch');
var _ = require('lodash');
var getIsBrowser = require('so_calendar/getIsBrowser');

var Calendar = require('so_calendar/calendar');
const PERSISTENT_HIGHEST_INDEX_KEY = 'SO_CALENDAR:HIGHEST_VISITED_INDEX';

//Put the initial state of your State here
var State = {
  calendar: new Calendar(),
  calendarIdx: 0,
  highestVisitedIdx: 0
};

var Store = flux.createStore({
  INIT : function(){
    fetch('api/calendar')
      .then((result) => result.json())
      .then((result) =>{
        State.calendar = new Calendar(result);

        if (getIsBrowser()) {
          try {
            var persistentIdx = parseInt(localStorage.getItem(PERSISTENT_HIGHEST_INDEX_KEY));
            if (persistentIdx) {
              this._setCalendarIdx(persistentIdx);
            }
          } catch(e) {
            // Swallow the error
          }
        }

        this.emitChange();
        return State.calendar;
      });
  },

  SET_CALENDAR_IDX: function(args) {
    this._setCalendarIdx(args);
  },

  BACK_ONE: function() {
    const idx = State.calendarIdx;
    if ( idx <= 0 ) {
      return;
    }

    this._setCalendarIdx(State.calendarIdx - 1);
  },

  FORWARD_ONE: function() {
    const idx = State.calendarIdx;
    if ( State.calendar.days.length <= idx) {
      return;
    }

    this._setCalendarIdx(State.calendarIdx + 1);
  },

  SET_CALENDAR_END: function() {
    this._setCalendarIdx(State.calendar.days.length ? State.calendar.days.length - 1 : 0);
  }
},{
  getState : function(){
    return State;
  },

  _setCalendarIdx: function(idx) {
    State.calendarIdx = Math.max(0, Math.min(idx, State.calendar.days.length - 1));
    State.highestVisitedIdx = Math.max(State.highestVisitedIdx, State.calendarIdx);
    if (getIsBrowser()) {
      try {
        localStorage.setItem(PERSISTENT_HIGHEST_INDEX_KEY, State.highestVisitedIdx);
      } catch (e) {
        // Swallow the error
      }
    }
  }
});

module.exports = Store;
