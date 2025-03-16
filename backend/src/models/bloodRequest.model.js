import { Schema, model } from "mongoose";

const bloodRequestSchema = new Schema(
    {
        hospitalId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Hospital making the request
        bloodBankId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Blood bank providing blood
        bloodGroup: { type: String, required: true },
        unitsRequested: { type: Number, required: true },
        status: { type: String, enum: ["Pending", "Completed", "Rejected", "Confirmed"], default: "Pending" },
        requestDate: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export const BloodRequest = model("BloodRequest", bloodRequestSchema);
