import { Router } from "express";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import Ticket from "../models/Ticket.js";
import { v4 as uuidv4 } from "uuid";
import passport from "passport";
import { authorize } from "../middlewares/authorization.js";

const router = Router();

// Crear carrito para usuario
router.post("/", passport.authenticate("jwt", { session: false }), authorize(["user"]), async (req, res) => {
  const existing = await Cart.findOne({ user: req.user.id });
  if (existing) return res.send({ message: "Cart already exists" });

  const cart = await Cart.create({ user: req.user.id });
  res.send({ message: "Cart created", cart });
});

// Agregar producto al carrito
router.post("/add", passport.authenticate("jwt", { session: false }), authorize(["user"]), async (req, res) => {
  const { productId, quantity } = req.body;
  const cart = await Cart.findOne({ user: req.user.id });

  if (!cart) return res.status(404).send({ message: "Cart not found" });

  const existing = cart.products.find(p => p.product.toString() === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.products.push({ product: productId, quantity });
  }

  await cart.save();
  res.send({ message: "Product added", cart });
});

// Finalizar compra
router.post("/purchase", passport.authenticate("jwt", { session: false }), authorize(["user"]), async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate("products.product");
  if (!cart || cart.products.length === 0) return res.status(400).send({ message: "Empty cart" });

  let total = 0;
  const unprocessed = [];

  for (const item of cart.products) {
    const product = item.product;
    if (product.stock >= item.quantity) {
      product.stock -= item.quantity;
      total += product.price * item.quantity;
      await product.save();
    } else {
      unprocessed.push({ product: product.title, available: product.stock });
    }
  }

  cart.products = [];
  await cart.save();

  const ticket = await Ticket.create({
    code: uuidv4(),
    amount: total,
    purchaser: req.user.email
  });

  res.send({ message: "Purchase processed", ticket, unprocessed });
});

export default router;
