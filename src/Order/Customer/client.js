import axios from "axios";

const API_BASE = process.env.REACT_APP_BASE_API_URL;
const USER_URL = `${API_BASE}/user`;

export const findPastOrders = async (userId) => {
    const response = await axios
        .get(`${USER_URL}/${userId}/pastOrders`);

    return response.data;
};

export const updatePastOrders = async (userId,customerOrder) => {
    const response = await axios
        .put(`${USER_URL}/${userId}/pastOrders`,customerOrder);

    return response.data;
};

