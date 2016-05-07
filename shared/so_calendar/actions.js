var dispatch = require('pico-flux').dispatch;
var Store = require('so_calendar/store.js');

var Actions = {
  init : function(){
    dispatch('INIT');
  },

  setCalendarIdx: function(newCalendarIdx) {
    dispatch('SET_CALENDAR_IDX', newCalendarIdx);
  },

  backOneDay: function() {
    dispatch('BACK_ONE');
  },

  forwardOneDay: function() {
    dispatch('FORWARD_ONE');
  },

  setBeginning: function() {
    dispatch('SET_CALENDAR_IDX', 0);
  },

  setEnd: function() {
    dispatch('SET_CALENDAR_END');
  }
};

module.exports = Actions;
