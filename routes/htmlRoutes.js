const app = require("express").Router();
const path = require('path');

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/index.html"))
});

app.get("/notes",(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/notes.html"))
});
//Delete a note
app.delete('/api/notes/:id', (req, res) => {
    const params = req.params.id;
    query(params, (err, result) => {
        if (err) {
            res.status(400).json({ error: res.message });
        } else {
            res.json
        }
        });
    });

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/index.html"))
});

module.exports = app;