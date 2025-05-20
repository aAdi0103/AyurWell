import express from "express";

import { protectRoute } from "../MiddleWare/authToken.js";
import { addMemberToGroup, createGroup, deleteGroup, getAllGroups, getGroupDetails, getGroups, leaveGroup, removeMemberFromGroup } from "../Controllers/groupController.js";

const router = express.Router();

router.post("/createGroup", protectRoute, createGroup);
router.get("/getGroups", protectRoute, getGroups);
router.get("/getGroupDetails/:groupId", protectRoute, getGroupDetails);
router.post("/addMemberToGroup", protectRoute, addMemberToGroup);
router.post("/removeMemberFromGroup", protectRoute, removeMemberFromGroup);
router.get("/getAllGroups",protectRoute,getAllGroups)
router.get("/leaveGroup/:id",protectRoute,leaveGroup)
router.get("/delete/:id",protectRoute,deleteGroup)


export default router;
