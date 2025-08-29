/**
 * Seed injector: Categories → Subcategories → Products (linked)
 * Usage:
 *   RESET=true node src/seed/inject.js   # (optionnel) vide les collections avant l’injection
 *   node src/seed/inject.js              # injection simple (upsert par slug)
 */

import dotenv from "dotenv";
import mongoose from "mongoose";
import Category from "../models/Category.js";
import Subcategory from "../models/Subcategory.js";
import Product from "../models/Product.js";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/shop";

// --- Helpers -----------------------------------------------------------------

function slugify(str) {
    return String(str)
        .toLowerCase()
        .normalize("NFD") // accents → ascii
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
}

async function upsertCategory(name) {
    const slug = slugify(name);
    const doc = await Category.findOneAndUpdate(
        { slug },
        { name, slug },
        { new: true, upsert: true }
    );
    return doc;
}

async function upsertSubcategory(name, categoryId) {
    const slug = slugify(name);
    const doc = await Subcategory.findOneAndUpdate(
        { slug, category: categoryId },
        { name, slug, category: categoryId },
        { new: true, upsert: true }
    );
    return doc;
}

async function upsertProduct(p, categoryId, subcategoryId) {
    const slug = p.slug || slugify(p.title);
    const payload = {
        title: p.title,
        slug,
        price: p.price ?? 0,
        stock: p.stock ?? 0,
        images: p.images ?? [],
        category: categoryId,
        subcategory: subcategoryId ?? null,
        description: p.description ?? "",
        attributes: p.attributes ?? {},
    };

    const doc = await Product.findOneAndUpdate(
        { slug },
        payload,
        { new: true, upsert: true }
    );
    return doc;
}

// --- Dataset d’exemple (modifie librement) -----------------------------------

const DATA = [
    {
        category: "Electronics",
        subcategories: [
            {
                name: "Smartphones",
                products: [
                    {
                        title: "Phone X 128GB",
                        price: 599,
                        stock: 40,
                        images: [],
                        description: "A powerful smartphone with a stunning display."
                    },
                    {
                        title: "Phone X 256GB",
                        price: 699,
                        stock: 25,
                        images: [],
                        description: "More storage for your life."
                    }
                ]
            },
            {
                name: "Headphones",
                products: [
                    {
                        title: "Pro ANC Headset",
                        price: 199,
                        stock: 120,
                        images: [],
                        description: "Active noise cancelling over-ear headphones."
                    },
                    {
                        title: "Wireless Earbuds S",
                        price: 89,
                        stock: 200,
                        images: [],
                        description: "Compact true wireless earbuds with charging case."
                    }
                ]
            }
        ]
    },
    {
        category: "Home & Kitchen",
        subcategories: [
            {
                name: "Coffee Machines",
                products: [
                    {
                        title: "Barista Espresso Pro",
                        price: 349,
                        stock: 30,
                        images: [],
                        description: "Semi-automatic espresso machine for home baristas."
                    }
                ]
            },
            {
                name: "Vacuum Cleaners",
                products: [
                    {
                        title: "Cyclone Max Vacuum",
                        price: 229,
                        stock: 60,
                        images: [],
                        description: "High suction, HEPA filter, lightweight design."
                    }
                ]
            }
        ]
    },
    {
        category: "Fashion",
        subcategories: [
            {
                name: "Sneakers",
                products: [
                    {
                        title: "Runner 2.0",
                        price: 119,
                        stock: 80,
                        images: [],
                        description: "Breathable mesh & responsive sole."
                    }
                ]
            },
            {
                name: "Jackets",
                products: [
                    {
                        title: "Windbreaker Lite",
                        price: 79,
                        stock: 50,
                        images: [],
                        description: "Water-resistant, packable, everyday jacket."
                    }
                ]
            }
        ]
    }
];

// --- Main --------------------------------------------------------------------

async function main() {
    console.log("[Seed] Connecting to DB:", MONGODB_URI);
    await mongoose.connect(MONGODB_URI, { dbName: "shop" });

    if (process.env.RESET === "true") {
        console.log("[Seed] RESET=true → clearing collections…");
        await Promise.all([
            Product.deleteMany({}),
            Subcategory.deleteMany({}),
            Category.deleteMany({}),
        ]);
    }

    let createdCats = 0, createdSubs = 0, createdProducts = 0;

    for (const block of DATA) {
        const cat = await upsertCategory(block.category);
        createdCats++;

        for (const sub of block.subcategories || []) {
            const subDoc = await upsertSubcategory(sub.name, cat._id);
            createdSubs++;

            for (const prod of sub.products || []) {
                await upsertProduct(prod, cat._id, subDoc._id);
                createdProducts++;
            }
        }
    }

    console.log(`[Seed] Done. Categories: ${createdCats}, Subcategories: ${createdSubs}, Products: ${createdProducts}`);
}

main()
    .then(() => mongoose.disconnect())
    .catch((err) => {
        console.error(err);
        mongoose.disconnect().finally(() => process.exit(1));
    });
