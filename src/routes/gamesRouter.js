import express from "express";
import cors from "cors";

import { getGames, postGame } from "../controllers/gamesControllers.js";
import { validateGame } from "../middleware/gameMiddleware.js";

const game = express();
game.use(cors());
game.use(express.json());

game.get("/games", getGames);
game.post("/games", validateGame, postGame);

export default game;