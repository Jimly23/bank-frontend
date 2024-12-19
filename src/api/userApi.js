import axios from "axios";

export const register = async (data) => {
  try {
    const response = await axios.post(`http://localhost:8000/api/users/register`, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export const login = async (data) => {
  try {
    const response = await axios.post("http://localhost:8000/api/users/login", data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/user/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export const getUsers = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/users');
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}