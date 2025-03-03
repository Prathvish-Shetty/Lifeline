import { Router } from "express";
import { verifyJWT, isDonor } from "../middlewares/auth.middleware.js";
import { bookAppointment, getDonorAppointments } from "../controllers/bloodDonation.controller.js";

const router = Router();

// Book a blood donation appointment
router.route("/book").post(verifyJWT, isDonor, bookAppointment);

// Get all donation appointments for a donor
router.route("/my-appointments").get(verifyJWT, isDonor, getDonorAppointments);

router.route("/")

export default router;
