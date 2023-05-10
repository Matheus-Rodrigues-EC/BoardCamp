import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

// import costumer from "./routes/costumerRoutes.js";
import game from "./routes/gamesRouter.js";

const app = express();
app.use(cors());
app.use(express.json());

// app.use(costumer);
app.use(game);

app.listen(process.env.PORT, () => {
    console.log("Server is running ate port: " + process.env.PORT);
})