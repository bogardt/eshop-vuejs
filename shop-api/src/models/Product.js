import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, default: 0 },
    images: [{ type: String }],
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory" },
    description: { type: String, default: "" },
    attributes: { type: Map, of: String }
  },
  { timestamps: true }
);
ProductSchema.index({ title: "text", description: "text" });
export default mongoose.model("Product", ProductSchema);
