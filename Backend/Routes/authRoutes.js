import express from "express";
import { signup, login, logout,getCurrentUser } from "../Controllers/authController.js";
import { protectRoute } from "../MiddleWare/authToken.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get('/me',protectRoute,getCurrentUser);


export default router;
