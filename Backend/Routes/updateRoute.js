import express from "express";
import { sleep} from "../Controllers/updateController.js";
import { protectRoute } from "../MiddleWare/authToken.js";

const router = express.Router();

router.post("/sleep",protectRoute,sleep);



export default router;
