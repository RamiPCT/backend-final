import { Router } from "express";
import userRoutes from "./user.routes.js";
import sessionRoutes from "./session.routes.js";
import productRoutes from "./products.routes.js";
import cartRoutes from "./cart.routes.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/sessions", sessionRoutes);
router.use("/products", productRoutes);
router.use("/carts", cartRoutes);

export default router;
