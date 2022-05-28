import express from "express";
import { login, logout, register } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authentication.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post([verifyToken], login);
router.route("/logout").get(logout);

export default router;
