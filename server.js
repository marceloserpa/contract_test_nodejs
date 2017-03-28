var express = require("express");
var bodyParser= require('body-parser')

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/notes_app');

var Schema = mongoose.Schema;

var NoteSchema = new Schema({
  title: String,
  description: String,
  date: { type: Date, default: Date.now }
});

const Note = mongoose.model('Note', NoteSchema);

app.post("/note/v1/notes/", function(req, res){
    const note = new Note(req.body);
    note.save(function(err, document){
        if(err){
            return console.log(err);
        } else {
            res.send("Ok")
        }
    })    
});

app.get("/note/v1/notes/", function(req, res){
    Note.find().sort({created_at: 1}).exec(function(err, notes) {
        if(err){
            return console.log(err);
        }else{
            res.send(notes);
        }
    })
});

app.listen(9000);