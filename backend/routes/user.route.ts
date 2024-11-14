import express from "express";
import { checkAuth, forgotPassword, login, logout, resetPassword, signup, updateProfile, verifyEmail } from "../controller/user.controller";
import { isAuthentication } from "../middlewares/isAuthentication";

const router = express.Router();


router.route("/check-auth").get(isAuthentication,checkAuth);
router.route("/signup").post(signup);
router.route("/login").post(login)
router.route("/logout").post(logout)
router.route("/verify-email").post(verifyEmail)
router.route("/forgot-password").post(forgotPassword)
router.route("/reset-password/:token").post(resetPassword)
router.route("/profile/update").put(isAuthentication,updateProfile)

export default router;