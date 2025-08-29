import Subcategory from "../models/Subcategory.js";

export async function listSubcategories(req, res, next) {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    const items = await Subcategory.find(filter).populate("category").sort({ name: 1 });
    res.json(items);
  } catch (e) { next(e); }
}

export async function createSubcategory(req, res, next) {
  try {
    const sub = await Subcategory.create(req.body);
    res.status(201).json(sub);
  } catch (e) { next(e); }
}
