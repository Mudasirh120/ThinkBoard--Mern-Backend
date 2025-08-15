import { Note } from "../model/Note.model.js";
export const getAllNotes = async (req, res) => {
  try {
    // const notes = await Note.find();
    const notes = await Note.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch notes from DB" });
    console.log("Can't get any notes from db", error);
  }
};
export const getOneNote = async (req, res) => {
  try {
    const id = req.params.id;
    const note = await Note.findById(id);
    res.status(200).json(note);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unable to fetch note you are looking from DB" });
    console.log("Can't get this note from db", error);
  }
};
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: "Unable to create new note in DB" });
    console.log("Can't create new note in db", error);
  }
};
export const updateNote = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      {
        new: true,
      }
    );
    if (!updatedNote) {
      return res
        .status(404)
        .json({ message: "Note you are searching for is not found" });
    }
    await updatedNote.save();
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: "Unable to update note in DB" });
    console.log("Can't update note in db", error);
  }
};
export const deleteNote = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      return res
        .status(404)
        .json({ message: "Note you are searching for is not found" });
    }
    res.status(200).json(deletedNote);
  } catch (error) {
    res.status(500).json({ message: "Unable to delete note in DB" });
    console.log("Can't delete note in db", error);
  }
};
