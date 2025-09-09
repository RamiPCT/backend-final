import { Router } from "express";
import passport from "passport";
import CartController from "../controllers/CartController.js";
import { authorization } from "../middlewares/authorization.js";

const router = Router();

// Crear carrito
router.post("/", CartController.createCart);

// Ver carrito
router.get("/:cid", CartController.getCart);

// Agregar producto al carrito → solo usuarios
router.post("/:cid/products/:pid", 
  passport.authenticate("jwt", { session: false }), 
  authorization("user"), 
  CartController.addProduct
);

// Finalizar compra
router.post("/:cid/purchase", 
  passport.authenticate("jwt", { session: false }), 
  authorization("user"), 
  CartController.purchase
);

export default router;
