import Category from "../models/Category.js";

export async function listCategories(req, res, next) {
  try {
    const items = await Category.find().sort({ name: 1 });
    res.json(items);
  } catch (e) { next(e); }
}

export async function createCategory(req, res, next) {
  try {
    const cat = await Category.create(req.body);
    res.status(201).json(cat);
  } catch (e) { next(e); }
}
