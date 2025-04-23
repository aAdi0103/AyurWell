import express from "express";
import { quizeResponse, sleep} from "../Controllers/updateController.js";
import { protectRoute } from "../MiddleWare/authToken.js";

const router = express.Router();

router.post("/sleep",protectRoute,sleep);
router.post("/quizeResponse",protectRoute,quizeResponse);



export default router;
