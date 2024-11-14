import express from "express";
import { createRestaurant, getRestaurant, getRestaurantOrder, getSingleRestaurant, searchRestaurant, updateOrderStatus, updateRestaurant } from "../controller/restaurant.controller";
import { isAuthentication } from "../middlewares/isAuthentication";
import upload from "../middlewares/multer";
const router = express.Router();

router.route("/").post(isAuthentication,upload.single("imageFile"),createRestaurant)
router.route("/").get(isAuthentication,getRestaurant);
router.route("/").put(isAuthentication,upload.single("imageFile"),updateRestaurant)
router.route("/order").get(isAuthentication,getRestaurantOrder)
router.route("/order/:orderId/status").put(isAuthentication,updateOrderStatus)
router.route("/search/:searchText").get(isAuthentication,searchRestaurant)
router.route("/:id").get(isAuthentication,getSingleRestaurant)

export default router