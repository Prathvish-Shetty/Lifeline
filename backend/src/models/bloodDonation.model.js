import { Schema, model } from "mongoose";

const donationSchema = new Schema(
    {
        donorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        bloodGroup: { type: String, required: true },
        units: { type: Number, required: true },
        appointmentDate: { type: Date, required: true }, // Scheduled donation date
        bloodBankId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Where donation happens
        status: { type: String, enum: ["Pending", "Confirmed", "Completed", "Rejected"], default: "Pending" }, // Track status
    },
    { timestamps: true }
);

export const BloodDonation = model("BloodDonation", donationSchema);
