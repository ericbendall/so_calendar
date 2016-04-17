var flux = require('pico-flux');
var fetch = require('isomorphic-fetch');
var _ = require('lodash');

var Calendar = require('so_calendar/calendar');

//Put the initial state of your State here
var State = {
  currentMonth: Calendar.createMonth('March', 31, 1),
  calendarIdx: 15,
  lastIdx: 14
};

var Store = flux.createStore({
  INIT : function(){
    fetch('api/calendar')
      .then((result) => result.json())
      .then((result) =>{
        console.log(result, null, 2);
        return result;
      });
  },

  SET_CALENDAR_IDX: function(args) {
    State.calendarIdx = args;
  }

},{
  getState : function(){
    return State;
  },

  getDayOfWeek: function(dayIdx) {
    return Calendar.DaysOfWeek[dayIdx]
  }
});

module.exports = Store;
