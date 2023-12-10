import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000/api";
const SANDWICHES_URL = `${API_BASE}/sandwiches`;

export const getSandwichByName = async (name) => {
    const { data } = await axios.get(`${SANDWICHES_URL}/search`, { params: { name } });
    return data;
  };
  