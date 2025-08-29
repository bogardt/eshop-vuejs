import { Router } from "express";
import { listProducts, getProduct, createProduct } from "../controllers/product.controller.js";
const r = Router();
r.get("/", listProducts);
r.get("/:slug", getProduct);
r.post("/", createProduct);
export default r;
