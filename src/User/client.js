import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api';
const ACCOUNT_URL = `${BASE_URL}/users`;
const ADDRESSES_URL = `${BASE_URL}/addresses`;
const PAYMENTS_URL = `${BASE_URL}/payments`;


export const getUserById = async (id) => {
    const { data } = await axios.get(`${ACCOUNT_URL}/${id}`);
    return data;
}

export const updateUser = async (id, user) => {
    await axios.put(`${ACCOUNT_URL}/${id}`, user);
}


export const getUserAddresses = async (userId) => {
    const { data } = await axios.get(`${ACCOUNT_URL}/${userId}/addresses`);
    return data;
}

export const deleteUserAddress = async (addressId) => {
    await axios.delete(`${ADDRESSES_URL}/${addressId}`);
}

export const updateUserAddress = async (addressId, address) => {
    await axios.put(`${ADDRESSES_URL}/${addressId}`, address);
}

export const addUserAddress = async (userId, address) => {
    const { data } = await axios.post(`${ACCOUNT_URL}/${userId}/addresses`, address);
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

//yiming
export const signout = async () => {
    // Note: The URL should match the one you've set up on your server for the sign-out route
    const response = await axios.post(`${ACCOUNT_URL}/signout`);
    return response.data;
};