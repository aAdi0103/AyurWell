import express from "express";
import { signUpController } from "../controller/auth/signUp.js";
import { loginController } from "../controller/auth/login.js";
import { logoutController } from "../controller/auth/logout.js";

router.post("/signup", signUpController);
router.post("/login",loginController);
router.get("/logout",logoutController);