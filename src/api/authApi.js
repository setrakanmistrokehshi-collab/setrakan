import axios from "axios";

const API = await axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Attach token automatically
API.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('API error:', err.response?.data || err.message);
    return Promise.reject(err);
  }
);
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers = req.headers || {};
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});
// REGISTER
export const registerUser = (formData) =>
  API.post("/register", formData);

// LOGIN
export const loginUser = (formData) =>
  API.post("/login", formData);


// GET ALL USERS (protected)
export const getUser = () =>
  API.get("/user", { withCredentials: true });
// UPDATE USER (protected)
export const updateUser = (id, payload) =>
  API.put(`/user/${id}`, payload, { withCredentials: true });

export const deleteUser =  (id) => 
  API.delete(`/user/${id}`, { withCredentials: true });