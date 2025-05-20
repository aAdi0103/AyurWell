import express from "express";

import { protectRoute } from "../MiddleWare/authToken.js";
import { getMessages } from "../Controllers/chatController.js";

const router = express.Router();

router.get("/getAllMessages/:groupId",protectRoute,getMessages);





export default router;
