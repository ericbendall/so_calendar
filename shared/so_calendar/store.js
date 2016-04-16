var flux = require('pico-flux');
var fetch = require('isomorphic-fetch');
var _ = require('lodash');

var Calendar = require('so_calendar/calendar');

// I forgot why I thought I needed this, but man I was convinced...
var isGetBrowser=new Function("try {return this===window;}catch(e){ return false;}");
var isBrowser = isGetBrowser();
console.log('Am I the browser? ' + isBrowser);

//Put the initial state of your State here
var State = {
  currentMonth: Calendar.createMonth('March', 31, 1),
  calendarIdx: 15,
  lastIdx: 14
};

var Store = flux.createStore({
  INIT : function(){

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
