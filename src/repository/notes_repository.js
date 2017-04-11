

var Note = require('../models');

var NoteRepository = (NoteSchema) => {
    return {
        save: (newNote) => {
            const note = new NoteSchema(newNote);
            return note.save();
        },
        findAll: () => {
            return NoteSchema.find().sort({created_at: -1});
        }
    }
};

module.exports = NoteRepository;
