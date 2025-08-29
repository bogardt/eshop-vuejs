import Product from "../models/Product.js";
import { parsePagination } from "../utils/pagination.js";

export async function listProducts(req, res, next) {
  try {
    const { page, limit, skip } = parsePagination(req.query);
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.subcategory) filter.subcategory = req.query.subcategory;
    if (req.query.q) filter.$text = { $search: req.query.q };

    const sort = {};
    if (req.query.sort === "price_asc") sort.price = 1;
    else if (req.query.sort === "price_desc") sort.price = -1;
    else sort.createdAt = -1;

    const [items, total] = await Promise.all([
      Product.find(filter)
        .populate("category subcategory")
        .sort(sort)
        .skip(skip)
        .limit(limit),
      Product.countDocuments(filter)
    ]);

    res.json({ items, page, limit, total, pages: Math.ceil(total / limit) });
  } catch (e) { next(e); }
}

export async function getProduct(req, res, next) {
  try {
    const item = await Product.findOne({ slug: req.params.slug }).populate("category subcategory");
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  } catch (e) { next(e); }
}

export async function createProduct(req, res, next) {
  try {
    const item = await Product.create(req.body);
    res.status(201).json(item);
  } catch (e) { next(e); }
}
