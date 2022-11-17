const express = require('express')
const app = express()
const port = 3000  
var bodyParser = require('body-parser')

app.set('view engine', 'ejs');
// app.use(express.static('public'))    
app.use(express.static(__dirname + '/public'));


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

const HandlingNotes = require('./models/NotesStorage')

const handling_notes = new HandlingNotes

app.get('/', async (req, res) => { 
    let NotesFile = await handling_notes.GetAllNotes(), newColour = await handling_notes.ChangeNoteColour(req.body.Colour) 
    res.render('HomeNotes', {NotesInfo: NotesFile, colourApply: newColour})
})  

app.get('/create_note', (req, res) => { 
  res.render('CreateNote')
})

app.get('/User_note', async (req, res) => { 
  let noteData = await handling_notes.GetAllNotes(), newColour = await handling_notes.ChangeNoteColour(req.body.Colour) 
  res.render('UserNote', {NoteInfo: noteData, colourApply: newColour})
})

app.get('/delete_note/:id', async (req, res) => {
  await handling_notes.DeleteNote(req.params.id)
  res.redirect('/')
}) 

app.get('/edit_note/:id/:title/:blog', (req, res) => {
  res.render('EditNote', {id: req.params.id, title: req.params.title, blog: req.params.blog})
}) 

app.get('/about_note', (req, res) => {
  res.render('AboutNote')
})

app.post('/edit_note/:id', async (req, res) => { 
    await handling_notes.EditNote(req.params.id, req.body.title, req.body.note)
  res.redirect('/')
})

app.post('/create_note', async (req, res) => { 
  let respones = await handling_notes.CreatNewNote(req.body.title, req.body.note) 
  respones ? res.redirect('/') : res.redirect('/User_note')
}) 

app.post('/delete_all_notes', async (req, res) => {
  await handling_notes.DeleteAll()
  res.redirect('/User_note')
}) 

app.post('/settings_colour', async (req, res) => {
  await handling_notes.ChangeNoteColour(req.body.Colour) 
  res.redirect('/User_note')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})