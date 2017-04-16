
var express = require('express');

var NoteController = (NoteRepository) => {
    return {
        post: (req, res) => {
            req.assert('title', 'required').notEmpty();
            req.assert('description', 'required').notEmpty();
            req.getValidationResult().then(saveNote);

            function saveNote(result){
                if (result.isEmpty()) {
                    NoteRepository.save(req.body)
                        .then(document => res.send("Ok"))
                        .catch(err => console.log(err));
                } else {
                    res.status(400).send(result.array());
                }      
            };
        },
        get: (req, res) => {
            NoteRepository.findAll()
                .then(notes => res.send(notes.map(mapToResponse)))
                .catch(err => console.log(err));
            
            function mapToResponse(n){
                return {
                    title: n.title,
                    description: n.description
                }
            };

        }
    }
}

module.exports = NoteController;