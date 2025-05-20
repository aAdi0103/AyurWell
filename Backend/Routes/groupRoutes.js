import express from "express";

import { protectRoute } from "../MiddleWare/authToken.js";
import { addMemberToGroup, createGroup, getAllGroups, getGroupDetails, getGroups, removeMemberFromGroup } from "../Controllers/groupController.js";

const router = express.Router();

router.post("/createGroup", protectRoute, createGroup);
router.get("/getGroups", protectRoute, getGroups);
router.get("/getGroupDetails/:groupId", protectRoute, getGroupDetails);
router.post("/addMemberToGroup", protectRoute, addMemberToGroup);
router.post("/removeMemberFromGroup", protectRoute, removeMemberFromGroup);
router.get("/getAllGroups",protectRoute,getAllGroups)


export default router;
