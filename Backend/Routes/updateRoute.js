import express from "express";
import { quizeResponse, sleep, updateDiet} from "../Controllers/updateController.js";
import { protectRoute } from "../MiddleWare/authToken.js";

const router = express.Router();

router.post("/sleep",protectRoute,sleep);
router.post("/quizeResponse",protectRoute,quizeResponse);
router.post("/dietPlanUpdate",protectRoute,updateDiet);


export default router;
