import { BloodDonation } from "../models/bloodDonation.model.js";
import { BloodRequest } from "../models/bloodRequest.model.js";
import { updateBloodInventoryOnDonation, updateBloodInventoryOnRequest } from "./inventory.controller.js";


const getBloodBankAppointments = async (req, res) => {
    try {
        const bloodBankId = req.user._id;
        const appointments = await BloodDonation.find({ bloodBankId }).populate("donorId", "name email");

        return res.status(200).json({ message: "Blood bank appointments fetched", data: appointments });
    } catch (error) {
        return res.status(500).json({ message: `Error fetching appointments: ${error.message}` });
    }
};

const getBloodRequestsForBank = async (req, res) => {
    try {
        const bloodBankId = req.user._id; // Logged-in blood bank admin

        const requests = await BloodRequest.find({ bloodBankId }).populate("hospitalId", "name address");

        return res.status(200).json({
            message: "Blood requests fetched successfully",
            data: requests,
        });
    } catch (error) {
        return res.status(500).json({ message: `Error fetching requests: ${error.message}` });
    }
};

const updateAppointmentStatus = async (req, res) => {
    try {
        const { appointmentId, status } = req.body;
        const bloodBankId = req.user._id; // Get logged-in blood bank ID

        // Validate status
        const validStatuses = ["Pending", "Confirmed", "Completed", "Rejected"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status update" });
        }

        // Find appointment
        const appointment = await BloodDonation.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        // Ensure only the assigned blood bank can update the status
        if (appointment.bloodBankId.toString() !== bloodBankId.toString()) {
            return res.status(403).json({ message: "Unauthorized to update this appointment" });
        }

        // Update status
        appointment.status = status;
        if (status === "Completed") {
            // Update Inventory
            await updateBloodInventoryOnDonation(
                appointment.bloodBankId, 
                appointment.bloodGroup, 
                appointment.units
            );
            appointment.donationDate = new Date(); // Mark donation completion
        }
        await appointment.save();

        return res.status(200).json({ message: `Appointment status updated to ${status}` });
    } catch (error) {
        return res.status(500).json({ message: `Error updating appointment: ${error.message}` });
    }
};

const updateBloodRequestStatus = async (req, res) => {
    try {
        const { requestId, status } = req.body; // "approved" or "rejected"
        const bloodBankId = req.user._id; // Logged-in blood bank admin

        // Validate status
        if (!["Confirmed", "Rejected", "Pending", "Completed"].includes(status)) {
            return res.status(400).json({ message: "Invalid status update" });
        }

        // Find the blood request
        const bloodRequest = await BloodRequest.findById(requestId);
        if (!bloodRequest) {
            return res.status(404).json({ message: "Blood request not found" });
        }

        // Ensure the logged-in user is the blood bank receiving the request
        if (bloodRequest.bloodBankId.toString() !== bloodBankId.toString()) {
            return res.status(403).json({ message: "Unauthorized to update this request" });
        }

        bloodRequest.status = status
        // If Completed, update inventory
        if (status === "Completed") {
            try {
                await updateBloodInventoryOnRequest(
                    bloodBankId, 
                    bloodRequest.bloodGroup, 
                    bloodRequest.unitsRequested
                );
            } catch (error) {
                return res.status(400).json({ 
                    message: "Approval failed: Not enough blood units available",
                    error: error.message 
                });
            }
        }

        await bloodRequest.save();

        return res.status(200).json({
            message: `Blood request ${status} successfully`,
            data: bloodRequest
        });
    } catch (error) {
        return res.status(500).json({ message: `Error updating blood request: ${error.message}` });
    }
};


export {
    getBloodBankAppointments,
    getBloodRequestsForBank,
    updateAppointmentStatus,
    updateBloodRequestStatus
}