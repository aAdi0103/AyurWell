import express from "express";
import { signup, login, logout,getCurrentUser } from "../Controllers/authController.js";
import { protectRoute } from "../MiddleWare/authToken.js";
import { creatingQuize } from "../Controllers/quizeController.js";

const router = express.Router();

router.post("/quizeAns",creatingQuize)


export default router;
