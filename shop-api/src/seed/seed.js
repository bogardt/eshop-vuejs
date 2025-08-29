import dotenv from "dotenv";
import { connectDB } from "../db.js";
import Category from "../models/Category.js";
import Subcategory from "../models/Subcategory.js";
import Product from "../models/Product.js";

dotenv.config();

async function run() {
  await connectDB(process.env.MONGODB_URI);

  await Promise.all([Product.deleteMany({}), Subcategory.deleteMany({}), Category.deleteMany({})]);

  const cat = await Category.create({ name: "Électronique", slug: "electronique" });
  const sub1 = await Subcategory.create({ name: "Smartphones", slug: "smartphones", category: cat._id });
  const sub2 = await Subcategory.create({ name: "Casques", slug: "casques", category: cat._id });

  await Product.create([
    {
      title: "Phone X 128Go",
      slug: "phone-x-128",
      price: 599,
      stock: 50,
      images: [],
      category: cat._id,
      subcategory: sub1._id,
      description: "Un super smartphone"
    },
    {
      title: "Casque Pro ANC",
      slug: "casque-pro-anc",
      price: 199,
      stock: 120,
      images: [],
      category: cat._id,
      subcategory: sub2._id,
      description: "Casque à réduction de bruit"
    }
  ]);

  console.log("Seed done.");
  process.exit(0);
}

run().catch((e) => { console.error(e); process.exit(1); });
