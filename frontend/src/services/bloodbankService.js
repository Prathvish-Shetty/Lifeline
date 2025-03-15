import API from "./api";

const appointments = async () => {
  try {
    const response = await API.get('/blood-banks/appointments');
    return response.data; 
  } catch (error) {
    console.error("Get Appointments Error:", error);
    throw error.response?.data || { message: "Getting Appointments failed" };
  }
};

const requests = async () => {
  try {
    const response = await API.get('/blood-banks/requests'); 
    return response.data; 
  } catch (error) {
    console.error("Get Requests Error:", error);
    throw error.response?.data || { message: "Getting Requests failed" };
  }
};

const updateAppointmentStatus = async (appointmentId, status) => { 
  try {
    const response = await API.patch('/blood-banks/update-appointment-status', { 
      appointmentId, 
      status 
    }); 
    return response.data; 
  } catch (error) {
    console.error("Update Appointment Status Error:", error);
    throw error.response?.data || { message: "Updating Appointment Status failed" };
  }
};

const updateRequestStatus = async (requestId, status) => { 
  try {
    const response = await API.patch('/blood-banks/update-request-status', { 
      requestId, 
      status 
    }); 
    return response.data; 
  } catch (error) {
    console.error("Update Request Status Error:", error);
    throw error.response?.data || { message: "Updating Request Status failed" };
  }
};

export {
  appointments,
  requests,
  updateAppointmentStatus,
  updateRequestStatus
};
