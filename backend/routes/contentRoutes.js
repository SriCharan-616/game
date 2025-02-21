import express from "express";
import { getGames, addGame } from "../controllers/contentController.js";

const router = express.Router();

router.get("/games", getGames);
router.post("/games", addGame);

export default router;
