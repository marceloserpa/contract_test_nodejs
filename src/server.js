var express = require("express");
var bodyParser= require('body-parser');
var expressValidator = require('express-validator');
var Note = require('./models')


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(expressValidator());

app.post("/note/v1/notes/", function(req, res){
    req.assert('title', 'required').notEmpty();
    req.assert('description', 'required').notEmpty();
    req.getValidationResult().then(function(result) {
        if (!result.isEmpty()) {
            res.status(400).send(result.array());
        } else {
            const note = new Note(req.body);
            note.save(function(err, document){
                if(err){
                    return console.log(err);
                } else {
                    res.send("Ok")
                }
            })  
        }      
    });
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


module.exports = app;