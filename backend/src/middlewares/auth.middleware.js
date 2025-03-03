import { User } from "../models/user.model.js"
import jwt from "jsonwebtoken"

export const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization").replace("Bearer ", "")
        if (!token) {
            return res.status(401).json({ message: "Unauthorized request" })
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        if (!user) {
            return res.status(401).json({ message: "Invalid Access Token" })
        }
        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({message: `${error?.message} || "Invalid Access Token"`})
    }
}

export const isDonor = (req, res, next) => {
    if (req.user.role !== "donor") {
        return res.status(403).json({ message: "Access denied. Donors only." });
    }
    next();
};

export const isHospital = (req, res, next) => {
    if (req.user.role !== "hospital") {
        return res.status(403).json({ message: "Access denied. Hospitals only." });
    }
    next();
};

export const isBloodBank = (req, res, next) => {
    if (req.user.role !== "blood_bank") {
        return res.status(403).json({ message: "Access denied. Blood Banks only." });
    }
    next();
};
