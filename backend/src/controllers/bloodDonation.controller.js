import { BloodDonation } from "../models/bloodDonation.model.js"
import { User } from "../models/user.model.js";

const bookAppointment = async (req, res) => {
    try {
        const { weight, bloodGroup, appointmentDate, bloodBankId } = req.body;
        const donorId = req.user._id; // Get logged-in donor ID
        // console.log(req.user)
        const units = weight >= 60 ? 450 : 350;
        // Check if blood bank exists
        const bloodBank = await User.findById(bloodBankId);
        if (!bloodBank || bloodBank.role !== "bloodBank") {
            return res.status(400).json({ message: "Invalid blood bank selected" });
        }

        // Create a new appointment
        const appointment = await BloodDonation.create({
            donorId,
            bloodGroup,
            units,
            appointmentDate,
            bloodBankId,
            status: "Pending"
        });

        return res.status(201).json({
            message: "Blood donation appointment booked successfully",
            data: appointment
        });
    } catch (error) {
        return res.status(500).json({ message: `Error booking appointment: ${error.message}` });
    }
};

const getDonorAppointments = async (req, res) => {
    try {
        const donorId = req.user._id;
        const appointments = await BloodDonation.find({ donorId }).populate("bloodBankId", "name");

        return res.status(200).json({ message: "Donor appointments fetched", data: appointments });
    } catch (error) {
        return res.status(500).json({ message: `Error fetching appointments: ${error.message}` });
    }
};



export {
    bookAppointment,
    getDonorAppointments
}