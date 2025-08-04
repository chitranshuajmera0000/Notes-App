import { Router } from "express";
import authRoutes from "./auth.js";
import noteRoutes from "./Note.js"; // <-- fixed casing to match file system

const router = Router();

router.use("/auth", authRoutes);
router.use("/", noteRoutes); // <-- add this

export { router };