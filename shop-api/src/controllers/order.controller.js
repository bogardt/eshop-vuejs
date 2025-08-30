// shop-api/src/controllers/order.controller.js
import mongoose from "mongoose";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

export async function createOrder(req, res, next) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { items = [], customer = {} } = req.body;
        if (!Array.isArray(items) || items.length === 0) {
            throw Object.assign(new Error("Items array is required"), { status: 400 });
        }

        // Recharger les produits pour prix & stock
        const productIds = items.map((i) => i.productId);
        const products = await Product.find({ _id: { $in: productIds } }).session(session);
        const productsMap = new Map(products.map((p) => [String(p._id), p]));

        const orderItems = [];
        let subtotal = 0;

        for (const i of items) {
            const qty = Math.max(1, parseInt(i.qty || 1, 10));
            const p = productsMap.get(String(i.productId));
            if (!p) {
                throw Object.assign(new Error("Product not found: " + i.productId), { status: 400 });
            }
            if (p.stock < qty) {
                throw Object.assign(new Error(`Insufficient stock for ${p.title} (available: ${p.stock})`), { status: 400 });
            }

            const price = p.price;
            const itemSubtotal = price * qty;

            orderItems.push({
                product: p._id,
                title: p.title,
                price,
                qty,
                subtotal: itemSubtotal,
            });

            subtotal += itemSubtotal;

            // décrémenter le stock
            p.stock -= qty;
            await p.save({ session });
        }

        const total = subtotal; // ajoute TVA/frais si besoin

        const order = await Order.create(
            [
                {
                    items: orderItems,
                    subtotal,
                    total,
                    customer: { email: customer?.email || "" },
                    status: "created",
                },
            ],
            { session }
        );

        await session.commitTransaction();
        res.status(201).json(order[0]);
    } catch (e) {
        await session.abortTransaction();
        next(e);
    } finally {
        session.endSession();
    }
}
