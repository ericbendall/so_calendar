var _ = require('lodash');
var moment = require('moment');

var Calendar = function(json) {
  this.name =  '',
  this.days = [{label: '', isNSFW: false, note: ''}];

  if (!json || !_.isArray(json.dayNotes) || !_.isNumber(json.year)) {
    return this;
  }

  var days = _.map(json.dayNotes, (dayNote, idx) => {
    // TODO: Optimize this a bit better maybe?
    var mDay = moment(json.year + '-01-01').add(idx, 'days');
    return {
      label: mDay.format('dddd, MMMM Do'),
      note: dayNote.note,
      isNSFW: dayNote.nsfw
    };
  });

  this.days = days;
  this.name = json.name || "Untitled Calendar";
  return this;
}

module.exports = Calendar;
