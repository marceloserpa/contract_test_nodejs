
var express = require('express');

var Note = require('../models');

const post = (req, res) => {
    req.assert('title', 'required').notEmpty();
    req.assert('description', 'required').notEmpty();
    req.getValidationResult().then(saveNote);

    function saveNote(result){
        if (result.isEmpty()) {
            const note = new Note(req.body);
            note.save()
                .then(document => res.send("Ok"))
                .catch(err => console.log(err));
        } else {
            res.status(400).send(result.array());
        }      
    };
};

const get = (req, res) => {
    Note.find()
        .sort({created_at: -1})
        .then(notes => res.send(notes))
        .catch(err => console.log(err));
};

module.exports = { get: get, post: post }