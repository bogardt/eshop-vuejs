import { Router } from "express";
import { listSubcategories, createSubcategory } from "../controllers/subcategory.controller.js";
const r = Router();
r.get("/", listSubcategories);
r.post("/", createSubcategory);
export default r;
