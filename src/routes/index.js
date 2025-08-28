import { Router } from "express";
import sessionRoutes from "./session.routes.js";
import userRoutes from "./user.routes.js";
import cartRoutes from "./cart.routes.js";

const router = Router();

router.use("/sessions", sessionRoutes);
router.use("/users", userRoutes);
router.use("/cart", cartRoutes);

export default router;
