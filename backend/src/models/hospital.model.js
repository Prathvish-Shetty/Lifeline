import { Schema, model } from "mongoose";

const HospitalSchema = new Schema(
    {
        hospitalId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
        licenseNumber: { type: String, required: true }, // Unique hospital identifier
    }, 
    { timestamps: true }
);

export const Hospital = model("Hospital", HospitalSchema);
