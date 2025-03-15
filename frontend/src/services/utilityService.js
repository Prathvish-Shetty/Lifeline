import API from "./api";

const getAllBloodbanks = async () => {
  try {
      const response = await API.get('/utility/all-bloodbanks');
      return response.data; 
  } catch (error) {
      console.error("Get all bloodbanks Error:", error);
      throw error.response?.data || { message: "Getting all bloodbanks failed" };
  }
};

const getAllDonors = async () => {
  try {
      const response = await API.get('/utility/all-donors');
      return response.data; 
  } catch (error) {
      console.error("Get all donors Error:", error);
      throw error.response?.data || { message: "Getting all donors failed" };
  }
};

const getAllHospitals = async () => {
  try {
      const response = await API.get('/utility/all-hospitals');
      return response.data; 
  } catch (error) {
      console.error("Get all hospitals Error:", error);
      throw error.response?.data || { message: "Getting all hospitals failed" };
  }
};

export {
  getAllBloodbanks,
  getAllDonors,
  getAllHospitals
}