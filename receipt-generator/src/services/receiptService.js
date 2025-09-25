// services/receiptService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const receiptService = {
  // ✅ Fetch current logged-in user info
  getUserData: async () => {
    const token = localStorage.getItem('token'); // get JWT token
    if (!token) throw new Error("No auth token found");

    const res = await axios.get(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}` // send token in headers
      }
    });
    return res.data; // { _id, name, email, avatar }
  },

  // ✅ Fetch all receipts for a specific user
  getReceipts: async (userId) => {
    const token = localStorage.getItem('token'); // include token here too
    if (!token) throw new Error("No auth token found");

    const res = await axios.get(`${API_URL}/file/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data; // { receipts: [...] }
  },

  // Optional: Upload receipt
  // uploadReceipt: async (formData) => {
  //   const token = localStorage.getItem('token');
  //   if (!token) throw new Error("No auth token found");
  //
  //   const res = await axios.post(`${API_URL}/receipts/upload`, formData, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //       Authorization: `Bearer ${token}`
  //     },
  //   });
  //   return res.data;
  // },
};

export default receiptService;
