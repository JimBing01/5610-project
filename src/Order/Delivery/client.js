import axios from "axios";

const API_BASE = process.env.REACT_APP_BASE_API_URL;
const USER_URL = `${API_BASE}/restaurant`;

export const findPastOrders = async () => {
    const response = await axios
        .get(`${USER_URL}/pastOrders`);

    return response.data;
};

export const updatePastOrders = async (customerOrder) => {
    const response = await axios
        .put(`${USER_URL}/pastOrders`,customerOrder);

    return response.data;
};