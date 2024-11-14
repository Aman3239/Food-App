import express from "express";
import { isAuthentication } from "../middlewares/isAuthentication";
import { addMenu, editMenu } from "../controller/menu.controller";
import upload from "../middlewares/multer";

const router = express.Router();

// Route to add a new menu item
router.post("/", isAuthentication, upload.single("image"), addMenu);

// Route to edit an existing menu item
router.put("/:id", isAuthentication, upload.single("image"), editMenu);

export default router;
