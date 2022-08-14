import { Router } from "express";
const router = Router();

import {
	register,
	login,
	logout,
	resetPassword,
	isLoggedIn,
} from "../controllers/authController.js";
import authenticateUser from "../middleware/authentication.js";

router.post("/register", register);
router.post("/login", login);
router.delete("/logout", logout);
router.post("/reset-password", authenticateUser, resetPassword);
router.route("/isLoggedIn").get(authenticateUser, isLoggedIn);

export default router;
