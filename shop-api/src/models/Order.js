// shop-api/src/models/Order.js
import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema(
    {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        qty: { type: Number, required: true, min: 1 },
        subtotal: { type: Number, required: true, min: 0 }
    },
    { _id: false }
);

const OrderSchema = new mongoose.Schema(
    {
        items: { type: [OrderItemSchema], required: true },
        subtotal: { type: Number, required: true, min: 0 },
        total: { type: Number, required: true, min: 0 }, // ajoute TVA/frais si besoin
        customer: {
            email: { type: String, trim: true }
        },
        status: { type: String, enum: ["created", "paid", "cancelled"], default: "created" }
    },
    { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
