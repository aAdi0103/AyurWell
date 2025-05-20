import express from "express";
import { signup, login, logout,getCurrentUser, getDietPlans, getAllUsers } from "../Controllers/authController.js";
import { protectRoute } from "../MiddleWare/authToken.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get('/me',protectRoute,getCurrentUser);
router.get("/dietplans",protectRoute,getDietPlans)
router.get("/allUsers",protectRoute,getAllUsers)


export default router;
