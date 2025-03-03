import { BloodRequest } from "../models/bloodRequest.model.js";
import { User } from "../models/user.model.js";

const requestBlood = async (req, res) => {
    try {
        const { bloodBankId, bloodGroup, unitsRequested, requestDate } = req.body;
        const hospitalId = req.user._id; // Extracting the hospital ID from the logged-in user

        // Check if the selected blood bank exists and has the correct role
        const bloodBank = await User.findById(bloodBankId);
        if (!bloodBank || bloodBank.role !== "blood_bank") {
            return res.status(400).json({ message: "Invalid blood bank selected" });
        }

        // Create a new blood request
        const request = await BloodRequest.create({
            hospitalId,
            bloodBankId,
            bloodGroup,
            unitsRequested,
            status: "pending",
            requestDate
        });

        return res.status(201).json({
            message: "Blood request successful",
            data: request
        });
    } catch (error) {
        return res.status(500).json({ message: `Error requesting blood: ${error.message}` });
    }
};

const getBloodRequestsForHospital = async (req, res) => {
    try {
        const hospitalId = req.user._id; // Logged-in hospital admin

        const requests = await BloodRequest.find({ hospitalId }).populate("bloodBankId", "name address");

        return res.status(200).json({
            message: "Blood requests fetched successfully",
            data: requests,
        });
    } catch (error) {
        return res.status(500).json({ message: `Error fetching requests: ${error.message}` });
    }
};



export { 
    requestBlood,
    getBloodRequestsForHospital
};
