import { Schema, model } from 'mongoose'

const DonorSchema = new Schema(
    {
        donorId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Donor userid
        dob: { type: Date, required: true }, 
        gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },
        bloodGroup: { type: String, required: true, enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"] },
        lastDonationDate: { type: Date },
        available: { type: Boolean, default: true }, // Can the donor donate blood now?
    },
    { timestamps: true }
);

export const Donor = model("Donor", DonorSchema)