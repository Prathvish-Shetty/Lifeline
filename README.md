# Blood Bank Management System

The **Blood Bank Management System** is a full-stack web application developed using the **MERN stack** with **Tailwind CSS v4** and **DaisyUI** for styling. It is designed to facilitate blood donation and management by connecting donors, recipients, hospitals, and blood banks efficiently.

## 🚀 Features
- User Authentication (Register/Login with JWT authentication)
- Role-based access control for:
  - Donors
  - Hospitals
  - Blood Banks
- Secure Cookie Management with `httpOnly` and `secure` flags
- CRUD Operations for Blood Banks, Hospitals, and Donors
- Access and Refresh Token Implementation for Enhanced Security

## 🛠️ Tech Stack
- **Frontend:** React.js (Vite), Tailwind CSS v4, Axios, React Router DOM, React Hook Form, Recoil (State Management)
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Deployment:** Frontend on **Render** (Static Site), Backend on **Render** (Web Service)

## 🌐 Deployment
### Frontend URL:
```
https://lifeline-frontend.onrender.com
```

### Backend URL:
```
https://lifeline-backend-wlpu.onrender.com/api
```

## ⚙️ Environment Variables
Create a `.env` file in both `backend` and `frontend` folders.

### Backend `.env`
```
PORT=8000
MONGODB_URI=<YOUR_MONGO_URI>
ACCESS_TOKEN_SECRET=<YOUR_ACCESS_TOKEN_SECRET>
REFRESH_TOKEN_SECRET=<YOUR_REFRESH_TOKEN_SECRET>
```

### Frontend `.env`
```
VITE_API_URL=https://lifeline-backend-wlpu.onrender.com/api
```

## 🖥️ Installation & Setup
1. Clone the repository
```bash
git clone https://github.com/Prathvish-Shetty/Lifeline.git
cd lifeline
```

2. Install dependencies for both frontend and backend
```bash
cd backend
npm install
cd ../frontend
npm install
```

3. Create `.env` files in both frontend and backend folders (see `.env` setup above).

4. Run the backend server
```bash
cd backend
npm run dev
```

5. Run the frontend server
```bash
cd frontend
npm run dev
```

6. Access the application at:
```
http://localhost:5173
```

## 🔐 Authentication Flow
- On **login**, `accessToken` and `refreshToken` are stored as **HTTP-only cookies**.
- On **logout**, cookies are cleared, and the server-side refresh token is deleted.
- Tokens are refreshed automatically if expired.

## 📋 Future Improvements
- Implement Notifications for Appointments & Requests
- Improve UI with More Interactive Features

## Special Thanks ❤️
A huge thanks to DaisyUI for providing an amazing UI component library, making the design process smooth and efficient!

## 🤝 Contribution
Contributions are welcome! Feel free to fork the repository and submit pull requests.

## 📧 Contact
If you have any questions, feel free to reach out:
- **LinkedIn:** [Prathvish Shetty](https://www.linkedin.com/in/prathvish-shetty-24227a257)

---
Developed by **Prathvish Shetty**

