const router = require("express").Router()
const Notes = require("../db/notes")

router.get('/api/notes', (req, res) => {
Notes.getNote().then(data => {
    return res.json(data)
})
});

// Displays a single character, or returns false
router.delete('/api/notes/:id', (req, res) => {
  Notes.deleteNote(req.params.id).then(() => res.json({ok: true}))
});

// Create New Characters - takes in JSON input
router.post('/api/notes', (req, res) => {
 Notes.addNote(req.body).then(data => res.json(data))
});

module.exports = router