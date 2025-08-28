import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const router = Router();

router.post("/register", passport.authenticate("register", { session: false }), (req, res) => {
    res.status(201).json({ status: "success", payload: req.user });
});

router.post("/login", passport.authenticate("login", { session: false }), (req, res) => {
    const token = jwt.sign({ id: req.user._id, email: req.user.email, role: req.user.role }, config.jwtSecret, { expiresIn: "1h" });
    res.cookie("jwtCookie", token, { httpOnly: true, maxAge: 3600000 }).json({ status: "success", payload: req.user });
});

router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
    res.json({ status: "success", payload: req.user });
});

export default router;