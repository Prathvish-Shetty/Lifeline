import { Router } from "express";
import { isBloodBank, verifyJWT } from "../middlewares/auth.middleware.js";
import { getBloodBankAppointments, getBloodRequestsForBank, updateAppointmentStatus, updateBloodRequestStatus } from "../controllers/bloodBank.controller.js";

const router = Router();

router.route("/appointments").get(verifyJWT, isBloodBank, getBloodBankAppointments);

router.route("/requests").get(verifyJWT, isBloodBank, getBloodRequestsForBank);

router.route("/update-appointment-status").post(verifyJWT, isBloodBank, updateAppointmentStatus)

router.route("/update-request-status").post(verifyJWT, isBloodBank, updateBloodRequestStatus)

export default router;