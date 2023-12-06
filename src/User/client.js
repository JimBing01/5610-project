import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api';
const ACCOUNT_URL = `${BASE_URL}/users`;
const ADDRESSES_URL = `${BASE_URL}/addresses`;

export const getUserById = async (id) => {
    const { data } = await axios.get(`${ACCOUNT_URL}/${id}`);
    return data;
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

export const getUserPaymentMethods = async (userId) => {
    const { data } = await axios.get(`${ACCOUNT_URL}/${userId}/payments`);
    return data;
}
