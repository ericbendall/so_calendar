var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var calendarSchema = new Schema({
  name : String,
  forId: String,
  creatorId: String,
  year: Number,
  dayNotes : [
    {
      note : String,
      nsfw: Boolean
    }
  ]
});

var Calendar = mongoose.model("Calendar", calendarSchema);
module.exports = Calendar;
