import API from "./api";

const getUserProfile = async () => {
  try {
      const response = await API.get('/users/profile');
      return response.data; 
  } catch (error) {
      console.error("Get Profile Error:", error);
      throw error.response?.data || { message: "Getting User Profile failed" };
  }
};

const getBloodbanks = async () => {
  try {
      const response = await API.get('/users/blood-banks');
      return response.data; 
  } catch (error) {
      console.error("Get Bloodbank Error:", error);
      throw error.response?.data || { message: "Getting Bloodbank failed" };
  }
};

const getDonors = async () => {
  try {
      const response = await API.get('/users/donors');
      return response.data; 
  } catch (error) {
      console.error("Get Donor Error:", error);
      throw error.response?.data || { message: "Getting Donors failed" };
  }
};

const getHospitals = async () => {
  try {
      const response = await API.get('/users/hospitals');
      return response.data; 
  } catch (error) {
      console.error("Get Hospital Error:", error);
      throw error.response?.data || { message: "Getting Hospital failed" };
  }
};
export {
  getUserProfile,
  getBloodbanks,
  getDonors,
  getHospitals
}