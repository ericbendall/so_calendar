var flux = require('pico-flux');
var fetch = require('isomorphic-fetch');
var _ = require('lodash');

var Calendar = require('so_calendar/calendar');

//Put the initial state of your State here
var State = {
  calendar: new Calendar(),
  calendarIdx: 0,
  lastIdx: 0
};

var Store = flux.createStore({
  INIT : function(){
    fetch('api/calendar')
      .then((result) => result.json())
      .then((result) =>{
        State.calendar = new Calendar(result);
        this.emitChange();
        return State.calendar;
      });
  },

  SET_CALENDAR_IDX: function(args) {
    State.calendarIdx = args;
  }

},{
  getState : function(){
    return State;
  }
});

module.exports = Store;
