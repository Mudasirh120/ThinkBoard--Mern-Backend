import { Router } from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getOneNote,
  updateNote,
} from "../controllers/notes.controller.js";
const router = Router();
router.get("/", getAllNotes);
router.get("/:id", getOneNote);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);
export default router;
