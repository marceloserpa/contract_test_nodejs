var express = require('express');
var router = express.Router();

var Note = require('../models/note_model');
var NoteRepository = require('../repository/notes_repository')(Note);
var NoteController = require('../controllers/notes_controller')(NoteRepository);

router.route('/note/v1/notes/')
    .post(NoteController.post)
    .get(NoteController.get);

module.exports = router