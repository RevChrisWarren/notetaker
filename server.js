const express = require('express');
const path = require('path');
const fs = require('fs');
//Creates unique user id for each notes entry
const uuid = require('./Develop/helpers/uuid');

const PORT = 3001;
//give access to database file
const notes = require('./Develop/db/db.json');
const app = express();

app.use(express.json());
app.use(express.static('public'));



//GET request for notes
app.get('/api/notes', (req, res) => {
    res.json(`${req.method} request received to get notes`);

    //Log that request to the terminal
    console.info(`${req.method} request received to get notes`);
})

//GET request for notes based on unique id
app.get('api/notes/:notes_id', (req, res) => {
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
app.post('api/notes', (req, res) => {

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
        // read db.json file to get notes already in file
        fs.readFile(`.Develop/db/db.json`, noteString, (err) =>
            err
                ? console.error(err)
                : console.log(
                    `Notes database has been accessed`
                )
        );
        //convert the data to a string so it can be saved
        const noteString = JSON.stringify(noteString, newNote);

        //Write the new notes file to the server with original notes and new note
        fs.writeFile(`./Develop/db/db.json`, noteString, (err) =>
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

app.listen(PORT, () => {
    console.log(`API Server now at http://localhost:${PORT}`);
});