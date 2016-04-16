var createMonth = function(monthName, numDays, weekStart) {
  var month = [[]];
  var curWeekIx = 0;

  var gridSize = (numDays + weekStart) + (7 - ((numDays + weekStart)%7));
  for (var ix = 0; ix < gridSize; ix ++) {
    if (month[curWeekIx].length === 7) {
      curWeekIx++;
      month.push([]);
    }

    var day = {id: ix};
    if (ix < weekStart || ix >= weekStart + numDays){
      day.label = 'Blank';
    } else {
      day.label = monthName + ' ' + (ix + 1 - weekStart);
      day.note = 'Here is something really super nice to say to you. N\'awwwww.';
      day.isNSFW = (ix % 3) === 0;
    }
    month[curWeekIx].push(day);
  }

  return month;
};

var DaysOfWeek = [
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

module.exports = {
  createMonth: createMonth,
  DaysOfWeek: DaysOfWeek
}
