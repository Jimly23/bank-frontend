import axios from "axios";

export const createQueue = async (data) => {
  try {
    const response = await axios.post("https://bank-backend-jet.vercel.app/api/queue", data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export const getQueues = async () => {
  try {
    const response = await axios.get("https://bank-backend-jet.vercel.app/api/queue");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export const getQueueByUser = async (telepon) => {
  try {
    // Gunakan 'params' untuk memasukkan data sebagai query parameter
    const response = await axios.get(`https://bank-backend-jet.vercel.app/api/queue/user?telepon=${telepon}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export const updateQueueStatus = async (id) => {
  try {
    const response = await axios.put("https://bank-backend-jet.vercel.app/api/queue", id);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}