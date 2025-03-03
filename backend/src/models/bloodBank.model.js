import { Schema, model } from 'mongoose'

const BloodBankSchema = new Schema(
    {
        bloodBankId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Blood Bank userid
        inventory: {
            A_pos: { type: Number, default: 0 },
            A_neg: { type: Number, default: 0 },
            B_pos: { type: Number, default: 0 },
            B_neg: { type: Number, default: 0 },
            O_pos: { type: Number, default: 0 },
            O_neg: { type: Number, default: 0 },
            AB_pos: { type: Number, default: 0 },
            AB_neg: { type: Number, default: 0 }
        },
        licenseNumber: { type: String, required: true }, // Unique bloodbank identifier
    },
    { timestamps: true }
);

export const BloodBank = model("BloodBank", BloodBankSchema)