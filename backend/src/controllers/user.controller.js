import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"
import { Donor } from "../models/donor.model.js"
import { Hospital } from "../models/hospital.model.js"
import { BloodBank } from "../models/bloodBank.model.js"

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong while generating access and refresh token" })
    }
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role, phone, address, district, state, dob, gender, bloodGroup, lastDonationDate, licenseNumber } = req.body;
        if ([name, email, password, role, phone, address, district, state].some((field) => field?.trim() === "")) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const existedUser = await User.findOne({ email })
        if (existedUser) {
            return res.status(400).json({ message: "User with username or email already exists" })
        }
        const user = await User.create({
            name, email, password, role, phone, address, district, state
        })

        // Handle Role-Specific Data
        if (role === "donor") {
            if (!dob || !gender || !bloodGroup) {
                return res.status(400).json({ message: "Date of birth, gender, and blood group are required for donors" });
            }
            await Donor.create({
                donorId: user._id,
                dob,
                gender,
                bloodGroup,
                lastDonationDate: lastDonationDate || null,
                available: true,
            });
        } else if (role === "hospital") {
            if (!licenseNumber) {
                return res.status(400).json({ message: "Hospital license number is required" });
            }
            await Hospital.create({
                hospitalId: user._id,
                licenseNumber,
            });
        } else if (role === "bloodBank") {
            if (!licenseNumber) {
                return res.status(400).json({ message: "Blood bank license number is required" });
            }
            await BloodBank.create({
                bloodBankId: user._id,
                licenseNumber, 
            });
        }

        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        )
        if (!createdUser) {
            return res.status(500).json({ message: "Something went wrong while registering the user" })
        }
        return res.status(201).json({
            message: "User registered Successfully",
            data: createdUser
        })
    } catch (error) {
        return res.status(500).json({ message: `${error} || "Something went wrong while registering the user"` })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    if (!(email || password)) {
        return res.status(400).json({ message: "username or password is required" })
    }

    const user = await User.findOne({ email })

    if (!user) {
        return res.status(404).json({ message: "User does not exist" })
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid user credentials" })
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findOne(user._id).select(
        "-password -refreshToken"
    )

    const options = {   // cookies can only be modified by server and not user
        httpOnly: true,  // Prevents JavaScript access
        secure: true,    // Only allows HTTPS
        sameSite: "Strict", // Prevents CSRF attacks
        maxAge: 15 * 60 * 1000  // 15 mins for 
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({
            message: "User logged in successfully", 
            user: loggedInUser,
            accessToken,
            refreshToken
        })
}

const logoutUser = async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from the document
            }
        },
        {
            new: true   // tell that this is a new response
        }
    )
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "Strict"
    }
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({ message: "User logged out successfully" })
}

const refreshAccessToken = async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    if (!incomingRefreshToken) {
        return res.status(401).json({ message: "Unauthorized request" })
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken?._id)
        if (!user) {
            return res.status(401).json({ message: "Invalid refresh token" })
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            return res.status(401).json({ message: "Refresh token is expired or used" })
        }

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "Strict"
        }

        const { accessToken, newRefreshToken } = await generateAccessAndRefreshTokens(user._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json({
                message: "Access token refreshed", 
                accessToken,
                refreshToken: newRefreshToken
            })
    } catch (error) {
        return res.status(401).json({ message: `${error?.message} || "Invalid refresh token"` })
    }
}

const changeCurrentPassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body
        const user = await User.findById(req.user?._id)
        const passwordCorrect = await user.isPasswordCorrect(oldPassword)
        if (!passwordCorrect) {
            return res.status(400).json({ message: "Invalid old password" })
        }
        user.password = newPassword
        await user.save({ validateBeforeSave: false })

        return res.status(200).json({ message: "Password changed successfully" })
    } catch (error) {
        return res.status(500).json({ message: `${error} || "Error in changing password"` })
    }
}

const getCurrentUser = async (req, res) => {
    return res.status(200).json({ message: "Current user fetched succesfully", user: req.user })
}

// Get all blood banks
const getAllBloodBanks = async (req, res) => {
    try {
        const bloodBanks = await User.find({ role: "bloodBank" }).select("_id name address phone");
        return res.status(200).json({ success: true, data: bloodBanks });
    } catch (error) {
        return res.status(500).json({ message: `Error fetching blood banks: ${error.message}` });
    }
};

// Get all hospitals
const getAllHospitals = async (req, res) => {
    try {
        const hospitals = await User.find({ role: "hospital" }).select("_id name address phone");
        return res.status(200).json({ success: true, data: hospitals });
    } catch (error) {
        return res.status(500).json({ message: `Error fetching hospitals: ${error.message}` });
    }
};

// Get all donors
const getAllDonors = async (req, res) => {
    try {
        const donors = await User.find({ role: "donor" }).select("_id name bloodGroup phone district state");
        return res.status(200).json({ success: true, data: donors });
    } catch (error) {
        return res.status(500).json({ message: `Error fetching donors: ${error.message}` });
    }
};


export {
    generateAccessAndRefreshTokens,
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    getAllBloodBanks,
    getAllDonors,
    getAllHospitals
}