// shop-api/src/routes/order.routes.js
import { Router } from "express";
import { createOrder } from "../controllers/order.controller.js";
const r = Router();

r.post("/", createOrder);

export default r;
