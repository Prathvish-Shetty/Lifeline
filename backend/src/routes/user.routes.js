import {Router} from "express"
import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    getAllBloodBanks, 
    getAllHospitals, 
    getAllDonors 
} from "../controllers/user.controller.js"

import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/logout").post(verifyJWT, logoutUser)

router.route("/refresh-token").post(refreshAccessToken)

router.route("/profile").get(verifyJWT, getCurrentUser)

router.route("/change-password").post(verifyJWT, changeCurrentPassword)

router.route("/blood-banks").get(verifyJWT, getAllBloodBanks);

router.route("/hospitals").get(verifyJWT, getAllHospitals);

router.route("/donors").get(verifyJWT, getAllDonors);


export default router