import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import Ticket from "../models/Ticket.js";
import { v4 as uuidv4 } from "uuid";

export default class CartService {
  async createCart() {
    return await Cart.create({ products: [] });
  }

  async getCartById(cartId) {
    return await Cart.findById(cartId).populate("products.product");
  }

  async addProductToCart(cartId, productId, quantity = 1) {
    const cart = await Cart.findById(cartId);
    if (!cart) throw new Error("Cart not found");

    const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

    if (productIndex >= 0) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    return await cart.save();
  }

  async purchase(cartId, purchaserEmail) {
    const cart = await Cart.findById(cartId).populate("products.product");
    if (!cart) throw new Error("Cart not found");

    let amount = 0;
    const productsNotProcessed = [];

    for (let item of cart.products) {
      const dbProduct = await Product.findById(item.product._id);
      if (!dbProduct) continue;

      if (dbProduct.stock >= item.quantity) {
        dbProduct.stock -= item.quantity;
        await dbProduct.save();
        amount += dbProduct.price * item.quantity;
      } else {
        productsNotProcessed.push(item.product._id);
      }
    }

    const ticket = await Ticket.create({
      code: uuidv4(),
      amount,
      purchaser: purchaserEmail
    });

    // Filtrar solo los productos no procesados
    cart.products = cart.products.filter(p => productsNotProcessed.includes(p.product._id));
    await cart.save();

    return { ticket, productsNotProcessed };
  }
}
