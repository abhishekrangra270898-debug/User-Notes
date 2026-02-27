const express = require("express");
const Note = require("../models/Note");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

/* CREATE NOTE */
router.post("/", auth, async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content required" });
    }

    const note = await Note.create({
      title,
      content,
      user: req.user.id
    });

    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: "Failed to create note" });
  }
});

/* GET USER NOTES */
router.get("/", auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notes" });
  }
});

/* DELETE NOTE (OWNER ONLY) */
router.delete("/:id", auth, async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    await note.deleteOne();
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;
