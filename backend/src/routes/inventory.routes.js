import { Router } from "express";
import { verifyJWT, isBloodBank } from "../middlewares/auth.middleware.js";
import { updateBloodInventoryOnDonation, getBloodInventory, updateBloodInventoryOnRequest } from "../controllers/inventory.controller.js";

const router = Router();

// router.route("/add-inventory").post(verifyJWT, isBloodBank, updateBloodInventoryOnDonation);
// router.route("/remove-inventory").post(verifyJWT, isBloodBank, updateBloodInventoryOnRequest);

// Get blood bank inventory details
router.route("/inventory").get(verifyJWT, isBloodBank, getBloodInventory);

export default router;
