import API from "./api";

const getInventory = async () => {
  try {
      const response = await API.get('/inventory/inventory');
      return response.data; 
  } catch (error) {
      console.error("Get Inventory Error:", error);
      throw error.response?.data || { message: "Getting Inventory failed" };
  }
};

const addInventory = async (details) => {
  try {
      const response = await API.post('/inventory/add-inventory', details);
      return response.data; 
  } catch (error) {
      console.error("Add Inventory Error:", error);
      throw error.response?.data || { message: "Adding Inventory failed" };
  }
};

export {
  getInventory,
  addInventory
}