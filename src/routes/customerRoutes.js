import express from "express";
import cors from "cors";

import { getCustomers, getCustomerId, postCustomer, putCustomer } from "../controllers/customerController.js";
import { validateCustomer, validatePutCustomer } from "../middleware/customerMiddleware.js";

const customer = express();
customer.use(cors());
customer.use(express.json());

customer.get("/customers", getCustomers);
customer.get("/customers/:id", getCustomerId);
customer.post("/customers", validateCustomer, postCustomer);
customer.put("/customers/:id", validatePutCustomer, putCustomer);

export default customer;