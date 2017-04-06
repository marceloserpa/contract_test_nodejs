
var express = require('express');
var router = express.Router();

var Note = require('../models');
var NoteController = require('../controllers/notes_controller')

router.route('/note/v1/notes/')
    .post(NoteController.post)
    .get(NoteController.get);
  
module.exports = router