import API from "./api";

const getRequests = async () => {
  try {
      const response = await API.get('/requests/my-requests');
      return response.data; 
  } catch (error) {
      console.error("Get Requests Error:", error);
      throw error.response?.data || { message: "Getting Requests failed" };
  }
};

const createRequest = async (data) => {
  try {
      const response = await API.post('/requests/request', data);
      return response.data; 
  } catch (error) {
      console.error("Blood Request Error:", error);
      throw error.response?.data || { message: "Blood Request failed" };
  }
};

export {
  createRequest,
  getRequests
}