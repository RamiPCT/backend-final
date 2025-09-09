import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String },
  code: { type: String, required: true, unique: true }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
