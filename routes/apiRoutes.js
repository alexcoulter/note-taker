const fs = require("fs");
var db = require("../db/db.json");

module.exports = function (app) {

  // reads the db.json file and returns all saved notes as JSON.
  app.get("/api/notes", function (req, res) {

    fs.readFile("./db/db.json", "utf8", function (error, data) {
      if (error) throw error;
      
      data = JSON.parse(data);
      res.json(data);
    });
  });


  // receives a new note to save on the request body, adds it to the db.json file, and then returns the new note to the client
  app.post("/api/notes", function (req, res) {
    db.push(req.body);

    fs.writeFile("./db/db.json", JSON.stringify(db), function (error, data) {
      if (error) throw error;
    });
    res.json(db)
  });


  // receives a query parameter containing the id of a note to delete, reads all notes from the db.json file & removes the note with the given id property, and then rewrites the notes to the db.json file.
  app.delete("/api/notes/:id", function (req, res) {
    console.log(`deleting  ID ${req.params.id}`);
    let id = req.params.id;

    fs.readFile("./db/db.json", "utf8", function (error, data) {
      if (error) throw error;

      data = JSON.parse(data);
      db = data.filter(note => id !== note.id);

      fs.writeFile("./db/db.json", JSON.stringify(db), function (error, data) {
        if (error) throw error;

        res.json(db);
      });
    });
  });
}
