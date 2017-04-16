
var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/notes_app');

mongoose.Promise = global.Promise;

module.exports = mongoose;