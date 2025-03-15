import API from "./api";

const getAppointments = async () => {
  try {
      const response = await API.get('/donations/my-appointments');
      return response.data; 
  } catch (error) {
      console.error("Get Appointments Error:", error);
      throw error.response?.data || { message: "Getting Appointments failed" };
  }
};

const bookAppointments = async (data) => {
  try {
      const response = await API.post('/donations/book', data);
      return response.data; 
  } catch (error) {
      console.error("Book Appointments Error:", error);
      throw error.response?.data || { message: "Booking Appointments failed" };
  }
};

export {
  getAppointments,
  bookAppointments
}