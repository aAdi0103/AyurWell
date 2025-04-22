import express from "express";
import { protectRoute } from "../MiddleWare/authToken.js";
import { creatingQuize } from "../Controllers/quizeController.js";

const router = express.Router();

router.post("/quizeAns",protectRoute,creatingQuize)


export default router;
