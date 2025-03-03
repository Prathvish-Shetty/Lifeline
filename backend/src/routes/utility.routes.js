import { Router } from "express";
import { getAllBloodBanks, getAllDonors, getAllHospitals } from "../controllers/user.controller.js";

const router = Router();

router.route("/all-bloodbanks").get(getAllBloodBanks);

router.route("/all-donors").get(getAllDonors);

router.route("/all-hospitals").get(getAllHospitals);

export default router;
