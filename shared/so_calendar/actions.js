var dispatch = require('pico-flux').dispatch;
var Store = require('so_calendar/store.js');

var Actions = {
  init : function(){
    dispatch('INIT');
  }
};

module.exports = Actions;
