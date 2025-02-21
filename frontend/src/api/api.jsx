import axios from "axios";
const API_URL = "http://localhost:5000/api";

// Register
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users/register`, userData);
  return response.data;
};

// Login
export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users/login`, userData);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

// Get Courses
export const getCourses = async () => {
  const response = await axios.get(`${API_URL}/courses`);
  return response.data;
};

// Create Course (Protected)
export const createCourse = async (courseData) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${API_URL}/courses`, courseData, {
    headers: { Authorization: token },
  });
  return response.data;
};
