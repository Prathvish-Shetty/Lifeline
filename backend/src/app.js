import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

// middlewares
app.use(cors({ // allow origin access
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json()) // expect json
app.use(express.static("public"))   // serve static files
app.use(cookieParser()) // parse cookies incomming requests
app.use(express.urlencoded({ extended: true }, { limit: "16kb" })) // parses incoming URL-encoded data (from HTML forms).

// routes

import userRouter from "./routes/user.routes.js"
import bloodBankRouter from "./routes/bloodBank.routes.js"
import bloodDonationRouter from "./routes/bloodDonation.routes.js"
import bloodRequestRouter from "./routes/bloodRequest.routes.js"
import inventoryRouter from "./routes/inventory.routes.js"
import utilityRouter from "./routes/utility.routes.js"

app.use("/api/users", userRouter); // User-related routes
app.use("/api/blood-banks", bloodBankRouter); // Blood bank-related routes
app.use("/api/donations", bloodDonationRouter); // Blood donation appointment routes
app.use("/api/requests", bloodRequestRouter); // Blood request routes
app.use("/api/inventory", inventoryRouter); // Blood bank inventory routes
app.use("/api/utility", utilityRouter); // Utility routes (fetching donors, hospitals, etc.)

export { app }