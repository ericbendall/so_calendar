var dispatch = require('pico-flux').dispatch;
var Store = require('so_calendar/store.js');

var Actions = {
  init : function(){
    dispatch('INIT');
  },

  setCalendarIdx: function(newCalendarIdx) {
    dispatch('SET_CALENDAR_IDX', newCalendarIdx);
  }
};

module.exports = Actions;
