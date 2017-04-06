
var mongoose = require("../db");

var Schema = mongoose.Schema;

var NoteSchema = new Schema({
  title: String,
  description: String,
  created_at: { type: Date, default: Date.now }
});

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;