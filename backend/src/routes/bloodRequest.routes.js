import { Router } from "express";
import { verifyJWT, isHospital } from "../middlewares/auth.middleware.js";
import { requestBlood, getBloodRequestsForHospital } from "../controllers/bloodRequest.controller.js";

const router = Router();

// Make a blood request
router.route("/request").post(verifyJWT, isHospital, requestBlood);

// Get all blood requests for a hospital
router.route("/my-requests").get(verifyJWT, isHospital, getBloodRequestsForHospital);

export default router;
