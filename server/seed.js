var mongoose = require('mongoose');
var Calendar = require('./models/calendar.js');

var mongoose = require('mongoose');


var seed = function() {

  return new Promise (function(resolve, reject){
    // Set up mongo db connection
    try {
      mongoose.connect('mongodb://localhost/so_calendar');
      var db = mongoose.connection;
      db.on('error', reject);
      db.once('open', function() {
        newCalendar = new Calendar({
          name : "Default Seeded Calendar",
          forId: "t",
          creatorId: "e",
          year: 2016,
          dayNotes : []
        });

        var notes = [];
        for (var ix = 0; ix < 365; ix++) {
          notes.push({
            note: "This is note number " + ix,
            nsfw: (ix % 3) === 0
          });
        }

        newCalendar.dayNotes = notes;
        newCalendar.save();
        resolve();
      });
    } catch (e){
      reject(e);
    }
  });
};
module.exports = seed;