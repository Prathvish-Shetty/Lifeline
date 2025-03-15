import API from "./api";

// Register User
const registerUser = async (userData) => {
  try {
    const response = await API.post('/users/register', userData);
    return response.data; 
  } catch (error) {
    console.error("Registration Error:", error);
    throw error.response?.data || { message: "Registration failed" };
  }
};

// Login User
const loginUser = async (loginData) => {
  try {
    const res = await API.post('/users/login', loginData);
    return res.data;
  } catch (error) {
    console.error("Login Error:", error);
    throw error.response?.data || { message: "Login failed" };
  }
};

// Logout User
const logoutUser = async () => {
  try {
    const response = await API.post('/users/logout');
    return response.data;
  } catch (error) {
    console.error("Logout Error:", error);
    throw error.response?.data || { message: "Logout failed" };
  }
};

// Refresh Token
const refreshToken = async () => {
  try {
    const response = await API.post('/users/refresh-token');
    return response.data;
  } catch (error) {
    console.error("Token Refresh Error:", error);

    // Handle expired refresh token — redirect to login
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }

    throw error.response?.data || { message: "Token Refresh failed" };
  }
};

// Change Password
const changePassword = async (passwordData) => {
  try {
    const response = await API.post('/users/change-password', passwordData); // Added `passwordData`
    return response.data;
  } catch (error) {
    console.error("Change Password Error:", error);
    throw error.response?.data || { message: "Change password failed" };
  }
};

export {
  loginUser,
  registerUser,
  refreshToken,
  logoutUser,
  changePassword
}
