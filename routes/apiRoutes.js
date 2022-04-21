let notes = require('../db/db.json');
const app = require("express").Router();
const fs = require('fs');

//Creates unique user id for each notes entry
const uuid = require('../helpers/uuid');

//GET request for notes
app.get('/api/notes', (req, res) => {
    // read db.json file to get notes already in file
  let noteString =  fs.readFileSync(`./db/db.json`)
//   , noteString, (err) =>
//         err
//             ? console.error(err)
            notes = JSON.parse(noteString) || [];
    

    //Log that request to the terminal
    console.info(`${req.method} request received to get notes`);

    res.json(notes);
})

//GET request for notes based on unique id
app.get('/api/notes/:notes_id', (req, res) => {
    if (req.body && req.params.note_id) {
        console.info(`${req.method} request received to get notes`);
        const noteId = req.params.note_id;
        for (let i = 0; i < notes.length; i++) {
            const currentNote = notes[i];
            if (currentNote.note_id === noteId) {
                res.json(currentNote);
                return
            }
        }
        res.json('Note not found');
    }
});
// POST request for new notes
app.post('/api/notes', (req, res) => {

    //Log that a POST request was received
    console.info(`${req.method} request received to add new note`);

    //Destructuring for items in req.body
    const { title, text } = req.body;

    //Check to see if all required properties are present
    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };

        //convert the data to a string so it can be saved
        const noteString = JSON.stringify(noteString, newNote);

        //Write the new notes file to the server with original notes and new note
        fs.writeFile(`./db/db.json`, noteString, (err) =>
            err
                ? console.error(err)
                : console.log(
                    `New Note ${newNote.title} has been written to file`
                )
        );
        const response = {
            status: 'success',
            body: newNote,
        };
        console.log(response);
        res.json(response);
    } else {
        res.json('Error in creating new note');
    }
});

module.exports = app;
