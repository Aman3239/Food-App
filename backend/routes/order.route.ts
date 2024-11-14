import express from "express"
import { isAuthentication } from "../middlewares/isAuthentication";
import { createCheckoutSession, getOrders, stripeWebhook } from "../controller/order.controller";
const  router = express.Router();

router.route("/").get(isAuthentication,getOrders),
router.route("/checkout/create-checkout-session").post(isAuthentication,createCheckoutSession);
router.route("/webhook").post(express.raw({type:'application/json'}),stripeWebhook);


export default router