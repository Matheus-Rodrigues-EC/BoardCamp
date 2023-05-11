import express from "express";
import cors from "cors";

import { getRentals, addRental, finishRental, deleteRental } from "../controllers/rentalsController.js";

const rental = express();
rental.use(cors());
rental.use(express.json());

rental.get("/rentals", getRentals);
rental.post("/rentals", addRental);
rental.post("/rentals/:id/return", finishRental);
rental.delete("/rentals/:id", deleteRental);

export default rental;