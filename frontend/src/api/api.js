import axios from 'axios';

const API_BASE = "http://localhost:3001/api";

const handleError = (err) => {
  if (err.response) {
    // Backend returned a response outside 2xx
    return err.response.data?.error || `Server error: ${err.response.status}`;
  } else if (err.request) {
    // Request made but no response received
    return "No response from server. Is it running?";
  } else {
    // Something else
    return err.message;
  }
};

export const getTransactions = async () => {
  try {
    const res = await axios.get(`${API_BASE}/transactions`);
    return { success: true, data: res.data };
  } catch (err) {
    console.error("Error fetching transactions:", err);
    return { success: false, error: handleError(err) };
  }
};

export const addTransaction = async (transaction) => {
  try {
    const res = await axios.post(`${API_BASE}/transactions`, transaction);
    return { success: true, data: res.data };
  } catch (err) {
    console.error("Error adding transaction:", err);
    return { success: false, error: handleError(err) };
  }
};
