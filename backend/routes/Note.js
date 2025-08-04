import { Router } from "express";
import Note from "../models/Note.js";
import { ensureAuthenticated } from "../middlewares/auth.js";
const router = Router();



router.post("/notes", ensureAuthenticated, async (req, res) => {
    const { title, content, userId } = req.body;
    try {
        const newNote = await Note.create({
            title,
            content,
            userId
        });
        if (!newNote) {
            return res.status(400).json({ message: "Note creation failed" });
        }

        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ message: "Error creating note", error });
    }
})


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

export default router;