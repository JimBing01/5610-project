import axios from "axios";

const API_BASE = process.env.REACT_APP_BASE_API_URL;
const USER_URL = `${API_BASE}/user`;


export const findShoppingCart = async (userId) => {
    const response = await axios
        .get(`${USER_URL}/${userId}/shopping-cart`);

    return response.data;
};

export const addPastOrders = async (userId,pastOrder) => {
    console.log(pastOrder)
    const response = await axios
        .post(`${USER_URL}/${userId}/shopping-cart`,pastOrder);

    return response.data;
};

export const findPastOrders = async (userId) => {
    const response = await axios
        .get(`${USER_URL}/${userId}/shopping-cart/pastOrders`);

    return response.data;
};

export const deleteShoppingCart = async (userId,orderId) => {
    const response = await axios
        .delete(`${USER_URL}/${userId}/shopping-cart/${orderId}`);
    return response.data;
};

export const updateShoppingCart = async (userId,orderId,quantity) => {
    const number = {quantity:quantity}
    const response = await axios
        .put(`${USER_URL}/${userId}/shopping-cart/${orderId}`,number);
    return response.data;
};

export const findAddresses = async (userId) => {
    const response = await axios
        .get(`${USER_URL}/${userId}/shopping-cart/addresses`);

    return response.data;
};
