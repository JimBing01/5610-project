import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_BASE;
const ACCOUNT_URL = `${API_BASE}/users`;
const PAYMENTS_URL = `${API_BASE}/payments`;

export const getUserById = async (id) => {
    const { data } = await axios.get(`${ACCOUNT_URL}/${id}`);
    return data;
}

export const updateUser = async (id, user) => {
    await axios.put(`${ACCOUNT_URL}/${id}`, user);
}


export const getUserAddresses = async (id) => {
    const { data } = await axios.get(`${ACCOUNT_URL}/${id}/addresses`);
    return data;
}


// Payment Methods Handling
export const getUserPaymentMethods = async (userId) => {
    const { data } = await axios.get(`${ACCOUNT_URL}/${userId}/payments`);
    return data;
}

export const deleteUserPaymentMethod = async (pid) => {
    await axios.delete(`${PAYMENTS_URL}/${pid}`);
}

export const updateUserPaymentMethod = async (pid, paymentDetails) => {
    await axios.put(`${PAYMENTS_URL}/${pid}`, paymentDetails);
}

export const addUserPaymentMethod = async (userId, paymentDetails) => {
    const { data } = await axios.post(`${ACCOUNT_URL}/${userId}/payments`, paymentDetails);
    return data;
}
