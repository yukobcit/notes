const express = require("express");
const database = require("./mysqlDatabase");

const app = express();

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))


app.get ("/notes", async (req, res) => {
  const notes = await database.getNotes();
  console.log(notes)
  res.render("notes.ejs", {
    notes,
  });
})

app.get("/notes/:id", async (req, res) => {
    const id = req.params.id
    try {
      const note = await mysqlDatabase.getNote(id)
      res.send(note)
    } catch (error) {
      console.error(error)
      res.sendStatus(500)
    }
  })

// app.get("/createNote", (req, res) => {
//   res.render("createNote.ejs")
// })

app.post("/notes", async(req, res) => {
  const data = req.body
  console.log(data);
  await database.addNote(data)

  res.redirect("/notes");
})

app.post("/notes/:id/delete", async(req, res) => {
    const id = req.params.id
    console.log(id);
    await database.deleteNote(id)
    res.redirect("/notes");
    // return result
})

app.use(express.static("public"))


const port = process.env.PORT || 8080
app.listen(port, () => console.log(`listening on port ${port}`))
