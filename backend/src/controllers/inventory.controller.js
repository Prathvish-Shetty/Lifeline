import { BloodBank } from "../models/bloodBank.model.js";
import mongoose from "mongoose";

const getBloodInventory = async (req, res) => {
    try {
        const bloodBankId = req.user._id; // Assuming the logged-in user is a blood bank

        const bloodBank = await BloodBank.findOne({ bloodBankId });

        if (!bloodBank) {
            return res.status(404).json({ message: "Blood bank not found" });
        }

        return res.status(200).json({ data: bloodBank.inventory });
    } catch (error) {
        return res.status(500).json({ message: `Error fetching inventory: ${error.message}` });
    }
};

const updateBloodInventoryOnDonation = async (bloodBankId, bloodGroup, units) => {
    try {
        const bloodBank = await BloodBank.findOne({ bloodBankId });

        if (!bloodBank) throw new Error("Blood bank not found");

        const groupKey = bloodGroup.replace("+", "_pos").replace("-", "_neg"); // Convert A+ -> A_pos
        bloodBank.inventory[groupKey] += units;

        await bloodBank.save();
    } catch (error) {
        console.error("Error updating inventory on donation:", error);
    }
};

const updateBloodInventoryOnRequest = async (bloodBankId, bloodGroup, unitsRequested) => {
    try {
        const bloodBank = await BloodBank.findOne({ bloodBankId: new mongoose.Types.ObjectId(bloodBankId) });

        if (!bloodBank) throw new Error("Blood bank not found");

        const groupKey = bloodGroup.replace("+", "_pos").replace("-", "_neg");

        if (bloodBank.inventory[groupKey] < unitsRequested) {
            throw new Error("Not enough blood units available");
        }

        bloodBank.inventory[groupKey] -= unitsRequested;
        await bloodBank.save();
    } catch (error) {
        console.error("Error updating inventory on request:", error);
    }
};

export {
    getBloodInventory,
    updateBloodInventoryOnDonation,
    updateBloodInventoryOnRequest
}