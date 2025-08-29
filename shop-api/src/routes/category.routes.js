import { Router } from "express";
import { listCategories, createCategory } from "../controllers/category.controller.js";
const r = Router();
r.get("/", listCategories);
r.post("/", createCategory);
export default r;
