import { Router } from "express";
import passport from "passport";
import ProductController from "../controllers/ProductController.js";
import { authorization } from "../middlewares/authorization.js";

const router = Router();

// Solo admin puede crear, actualizar y borrar
router.post("/", passport.authenticate("jwt", { session: false }), authorization("admin"), ProductController.create);
router.put("/:id", passport.authenticate("jwt", { session: false }), authorization("admin"), ProductController.update);
router.delete("/:id", passport.authenticate("jwt", { session: false }), authorization("admin"), ProductController.delete);

// Todos los usuarios pueden ver productos
router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getById);

export default router;
