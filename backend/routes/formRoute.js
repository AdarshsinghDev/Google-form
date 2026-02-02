import express from "express";
import { getAllForm, submitForm } from "../controllers/formController.js";

const router = express.Router();

router.post("/submit", submitForm);
router.get("/all", getAllForm);

export default router;