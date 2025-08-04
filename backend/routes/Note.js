import { Router } from "express";
import Note from "../models/Note.js";
import { ensureAuthenticated } from "../middlewares/auth.js";
const router = Router();


router.post("/notes", ensureAuthenticated, async (req, res) => {
    const { title, content } = req.body;
    try {
        const newNote = new Note({
            title,
            content,
            userId: req.user._id // Set userId from the authenticated user
        });
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ message: "Error creating note", error });
    }
});


router.get('/notes', ensureAuthenticated, async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user._id });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching notes", error });
    }

})

router.delete('/notes/:id', ensureAuthenticated, async (req, res) => {
    try {
        const noteId = req.params.id;
        const deletedNote = await Note.deleteOne({ _id: noteId, userId: req.user._id });
        if (deletedNote.deletedCount === 0) {
            return res.status(404).json({ message: "Note not found or unauthorized" });
        }
        res.status(204).json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting note", error });
    }
})

router.put('/notes/:id', ensureAuthenticated, async (req, res) => {
    const { title, content } = req.body;
    try {
        const noteId = req.params.id;
        const updatedNote = await Note.findOneAndUpdate(
            { _id: noteId, userId: req.user._id },
            { title, content, updatedAt: new Date() },
            { new: true, runValidators: true }
        );
        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found or unauthorized" });
        }
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: "Error updating note", error });
    }
});

export default router;