import CartService from "../services/CartService.js";

const cartService = new CartService();

export default class CartController {
  static async createCart(req, res) {
    try {
      const cart = await cartService.createCart();
      res.status(201).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getCart(req, res) {
    try {
      const cart = await cartService.getCartById(req.params.cid);
      if (!cart) return res.status(404).json({ error: "Cart not found" });
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async addProduct(req, res) {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
      const updatedCart = await cartService.addProductToCart(cid, pid, quantity || 1);
      res.json(updatedCart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async purchase(req, res) {
    try {
      const { cid } = req.params;
      const purchaserEmail = req.user.email; // viene del JWT
      const result = await cartService.purchase(cid, purchaserEmail);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
